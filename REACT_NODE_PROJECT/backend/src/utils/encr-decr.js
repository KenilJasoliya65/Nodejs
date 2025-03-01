const crypto = require("crypto");
const { Module } = require("module");
const algorithm = "aes-256-cbc";
const ENCRYPTION_KEY = "15c15e1b24b8267224399ce445eee91d";
const key = crypto
  .createHash("sha256")
  .update(String(ENCRYPTION_KEY))
  .digest("base64")
  .substr(0, 32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hax"), encryptedData: encrypted };
};

const decrypt = (encryptedData, ivHex) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
