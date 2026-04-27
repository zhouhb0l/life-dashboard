(function () {
  const DB_NAME = "daily-plan-local-db";
  const DB_VERSION = 1;
  const STORE_NAME = "records";
  const STATE_KEY = "main";
  const LEGACY_STORAGE_KEY = "daily-plan.journal-projects.local.v1";

  function clone(value) {
    return structuredClone(value);
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB is not available."));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function withStore(mode, action) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, mode);
      const store = transaction.objectStore(STORE_NAME);
      let actionResult;

      transaction.oncomplete = () => {
        db.close();
        resolve(actionResult);
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
      transaction.onabort = () => {
        db.close();
        reject(transaction.error);
      };

      actionResult = action(store);
    });
  }

  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function readFromDatabase() {
    const record = await withStore("readonly", (store) => requestToPromise(store.get(STATE_KEY)));
    return record ? record.value : null;
  }

  async function writeToDatabase(state) {
    await withStore("readwrite", (store) => store.put({
      id: STATE_KEY,
      value: clone(state),
      updatedAt: new Date().toISOString()
    }));
  }

  function readLegacy(defaultData) {
    try {
      const parsed = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
      if (isValidState(parsed)) return parsed;
    } catch (error) {
      return null;
    }
    return clone(defaultData);
  }

  function writeLegacy(state) {
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
  }

  function isValidState(state) {
    return Boolean(state && Array.isArray(state.days) && Array.isArray(state.projects));
  }

  function mergeById(currentItems, defaultItems) {
    const currentMap = new Map(currentItems.map((item) => [item.id, item]));
    const merged = defaultItems.map((item) => ({ ...currentMap.get(item.id), ...clone(item) }));
    const defaultIds = new Set(defaultItems.map((item) => item.id));
    const extraItems = currentItems.filter((item) => !defaultIds.has(item.id));
    return [...merged, ...extraItems];
  }

  function upgradeState(currentState, defaultData) {
    const currentVersion = Number(currentState.dataVersion || 0);
    const defaultVersion = Number(defaultData.dataVersion || 0);

    if (currentVersion >= defaultVersion) return currentState;

    return {
      ...currentState,
      dataVersion: defaultVersion,
      days: mergeById(currentState.days, defaultData.days),
      projects: mergeById(currentState.projects, defaultData.projects)
    };
  }

  async function load(defaultData) {
    try {
      const databaseState = await readFromDatabase();
      if (isValidState(databaseState)) {
        const upgradedState = upgradeState(databaseState, defaultData);
        if (upgradedState !== databaseState) await writeToDatabase(upgradedState);
        return upgradedState;
      }

      const initialState = readLegacy(defaultData);
      const upgradedState = upgradeState(initialState, defaultData);
      await writeToDatabase(upgradedState);
      return upgradedState;
    } catch (error) {
      return upgradeState(readLegacy(defaultData), defaultData);
    }
  }

  async function save(state) {
    try {
      await writeToDatabase(state);
    } catch (error) {
      writeLegacy(state);
    }
  }

  window.DailyPlanDB = {
    load,
    save
  };
})();
