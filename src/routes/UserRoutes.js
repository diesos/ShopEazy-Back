const userRouter = require("express").Router();
const { login, register, resetPassword } = require("../controllers/UserControllers")
const { jwtAuth } = require("../middleWare/jwtAuth");


userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/reset-password", jwtAuth, resetPassword);
userRouter.get("/me", jwtAuth, (_, res) => {res.send("User profile page");});

module.exports = userRouter;
