const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET } = process.env;

class authenticate {
  static hashpassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparepassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
  static generateToken(payload) {
    console.log(payload);
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
  static usenameGenetor(full_name) {
    return String(
      full_name.split(" ").join("").toLowerCase() +
        (+Date.now() * Math.random()).toString().substring(0, 1)
    );
  }
}
module.exports = authenticate;
