(function () {
  const DB_NAME = "daily-plan-local-db";
  const DB_VERSION = 1;
  const STORE_NAME = "records";
  const STATE_KEY = "main";
  const LEGACY_STORAGE_KEY = "daily-plan.journal-projects.local.v1";
  const ENCRYPTED_STORAGE_KEY = "daily-plan.encrypted-state.v1";

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

  async function writeToDatabase(value) {
    await withStore("readwrite", (store) => store.put({
      id: STATE_KEY,
      value: clone(value),
      updatedAt: new Date().toISOString()
    }));
  }

  function readLocalStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeEncryptedFallback(envelope) {
    localStorage.setItem(ENCRYPTED_STORAGE_KEY, JSON.stringify(envelope));
  }

  function clearLegacyPlaintextStorage() {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch (error) {
      // Local storage cleanup is best-effort only.
    }
  }

  function clearEncryptedFallback() {
    try {
      localStorage.removeItem(ENCRYPTED_STORAGE_KEY);
    } catch (error) {
      // Local storage cleanup is best-effort only.
    }
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

  async function decryptState(envelope, passphrase, defaultData) {
    const state = await DailyPlanCrypto.decryptEnvelope(envelope, passphrase);
    if (!isValidState(state)) throw new Error("Stored daily plan data is invalid.");
    return upgradeState(state, defaultData);
  }

  async function migratePlaintextState(state, passphrase, defaultData) {
    const upgradedState = upgradeState(state, defaultData);
    await save(upgradedState, passphrase);
    clearLegacyPlaintextStorage();
    return upgradedState;
  }

  async function load(defaultData, passphrase) {
    try {
      const databaseValue = await readFromDatabase();
      if (DailyPlanCrypto.isEnvelope(databaseValue)) {
        return decryptState(databaseValue, passphrase, defaultData);
      }
      if (isValidState(databaseValue)) {
        return migratePlaintextState(databaseValue, passphrase, defaultData);
      }
    } catch (error) {
      // Fall back to localStorage below.
    }

    const encryptedFallback = readLocalStorage(ENCRYPTED_STORAGE_KEY);
    if (DailyPlanCrypto.isEnvelope(encryptedFallback)) {
      return decryptState(encryptedFallback, passphrase, defaultData);
    }

    const legacyPlaintext = readLocalStorage(LEGACY_STORAGE_KEY);
    if (isValidState(legacyPlaintext)) {
      return migratePlaintextState(legacyPlaintext, passphrase, defaultData);
    }

    return clone(defaultData);
  }

  async function save(state, passphrase) {
    const envelope = await DailyPlanCrypto.encryptState(state, passphrase);

    try {
      await writeToDatabase(envelope);
      clearEncryptedFallback();
    } catch (error) {
      writeEncryptedFallback(envelope);
    }

    clearLegacyPlaintextStorage();
  }

  window.DailyPlanDB = {
    load,
    save
  };
})();
