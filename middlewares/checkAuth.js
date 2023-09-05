const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const { JWT_SECRET } = process.env;

exports.checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  let token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "no token ,authorization denied",
    });
  }

  const decode = jwt.verify(token, JWT_SECRET);
  console.log(decode);
  const user = await Users.findOne({
    where: { user_id: decode.user_id },
  });

  if (!user) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
  req.currentUser = user;
  next();
};
exports.retrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return res.status(403).json({
        message: "forbidden",
      });
    }
    next();
  };
};
