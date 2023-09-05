const express = require("express");
const Router = express.Router();
const usercontroller = require("../controllers/usercontrollers");
const { checkAuth, retrict } = require("../middlewares/checkAuth");
const asynchandler = require("../middlewares/asychandler");

Router.post("/signin", usercontroller.signIn);
Router.post("/login", usercontroller.login);
Router.get("/profile", asynchandler(checkAuth), usercontroller.profile);
Router.put(
  "/profile/update",
  asynchandler(checkAuth),
  usercontroller.updateProfile
);
Router.get(
  "/users",
  asynchandler(checkAuth),
  asynchandler(retrict("admin")),
  usercontroller.getallusers
);

module.exports = Router;
