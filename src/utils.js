const crypto = require("crypto");
const validator = require("validator");

// Generate short code (7 chars from MD5 hash, improve later with base62)
function generateShortCode(url) {
  if (!validator.isURL(url)) throw new Error("Invalid URL");
  const hash = crypto.createHash("md5").update(url).digest("hex");
  return hash.substring(0, 7);
}

module.exports = { generateShortCode };
