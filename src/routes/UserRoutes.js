const userRouter = require("express").Router();
const { register } = require("../controllers/UserControllers")


userRouter.post("/login", (req, res) => {res.send("Login page");});
userRouter.post("/register", register);
userRouter.get("/me", (req, res) => {res.send("User profile page");});

module.exports = userRouter;
