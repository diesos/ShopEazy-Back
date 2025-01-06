const userRouter = require("express").Router();


userRouter.post("/login", (req, res) => {res.send("Login page");});
userRouter.post("/register", (req, res) => {res.send("Register page");});
userRouter.get("/me", (req, res) => {res.send("User profile page");});

module.exports = userRouter;
