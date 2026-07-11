(function () {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const DEFAULT_ITERATIONS = 220000;
  const FORMAT = "daily-plan-vault";

  function assertCryptoAvailable() {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("This browser does not support Web Crypto. Use a current browser over HTTPS.");
    }
  }

  function base64ToBytes(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  function bytesToBase64(bytes) {
    let binary = "";
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return btoa(binary);
  }

  async function deriveKey(passphrase, salt, iterations) {
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(passphrase),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  function isEnvelope(value) {
    return Boolean(
      value &&
      value.format === FORMAT &&
      value.algorithm === "AES-GCM" &&
      value.kdf === "PBKDF2-SHA-256" &&
      typeof value.ciphertext === "string" &&
      typeof value.iv === "string" &&
      typeof value.salt === "string"
    );
  }

  async function decryptEnvelope(envelope, passphrase) {
    assertCryptoAvailable();
    if (!passphrase) throw new Error("Enter the vault passphrase.");
    if (!isEnvelope(envelope)) throw new Error("The encrypted daily plan payload is missing or invalid.");

    try {
      const salt = base64ToBytes(envelope.salt);
      const iv = base64ToBytes(envelope.iv);
      const ciphertext = base64ToBytes(envelope.ciphertext);
      const iterations = Number(envelope.iterations || DEFAULT_ITERATIONS);
      const key = await deriveKey(passphrase, salt, iterations);
      const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
      return JSON.parse(decoder.decode(plaintext));
    } catch (error) {
      throw new Error("Unlock failed. Check the passphrase and try again.");
    }
  }

  async function encryptState(state, passphrase, options = {}) {
    assertCryptoAvailable();
    if (!passphrase) throw new Error("Cannot save without an unlocked vault passphrase.");

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const iterations = Number(options.iterations || window.DAILY_PLAN_ENCRYPTED_DATA?.iterations || DEFAULT_ITERATIONS);
    const key = await deriveKey(passphrase, salt, iterations);
    const plaintext = encoder.encode(JSON.stringify(state));
    const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext));

    return {
      format: FORMAT,
      version: 1,
      algorithm: "AES-GCM",
      kdf: "PBKDF2-SHA-256",
      iterations,
      salt: bytesToBase64(salt),
      iv: bytesToBase64(iv),
      ciphertext: bytesToBase64(ciphertext),
      updatedAt: new Date().toISOString()
    };
  }

  window.DailyPlanCrypto = {
    decryptEnvelope,
    encryptState,
    isEnvelope
  };
})();
