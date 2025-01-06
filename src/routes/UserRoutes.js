const userRouter = require("express").Router();
const { login, register, resetPassword } = require("../controllers/UserControllers")


userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/me", (_, res) => {res.send("User profile page");});

module.exports = userRouter;
