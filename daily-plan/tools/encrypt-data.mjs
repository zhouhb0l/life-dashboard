import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const [, , sourcePath = "daily-plan/data.js", outputPath = "daily-plan/encrypted-data.js"] = process.argv;
const passphrase = process.env.DAILY_PLAN_PASSPHRASE;
const iterations = Number(process.env.DAILY_PLAN_ITERATIONS || 220000);

if (!passphrase) {
  console.error("Set DAILY_PLAN_PASSPHRASE before running this script.");
  process.exit(1);
}

function readDailyPlanData(sourceText, sourcePath) {
  if (sourcePath.endsWith(".json")) return JSON.parse(sourceText);

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(sourceText, context, { filename: sourcePath });
  if (!context.window.DAILY_PLAN_DEFAULT_DATA) {
    throw new Error("Could not find window.DAILY_PLAN_DEFAULT_DATA in the source file.");
  }
  return context.window.DAILY_PLAN_DEFAULT_DATA;
}

const sourceText = await readFile(sourcePath, "utf8");
const data = readDailyPlanData(sourceText, sourcePath);
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(passphrase, salt, iterations, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([
  cipher.update(JSON.stringify(data), "utf8"),
  cipher.final()
]);
const ciphertext = Buffer.concat([encrypted, cipher.getAuthTag()]);

const envelope = {
  format: "daily-plan-vault",
  version: 1,
  algorithm: "AES-GCM",
  kdf: "PBKDF2-SHA-256",
  iterations,
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  ciphertext: ciphertext.toString("base64"),
  updatedAt: new Date().toISOString()
};

await writeFile(
  outputPath,
  `window.DAILY_PLAN_ENCRYPTED_DATA = ${JSON.stringify(envelope, null, 2)};\n`,
  "utf8"
);
