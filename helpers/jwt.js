const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "feedloop";

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { sign, verify };
