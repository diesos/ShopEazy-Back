const listRouter = require("express").Router();


listRouter.get("/", (_, res)=> res.send("liste de course"));
listRouter.get("/item", (_, res)=> res.send("item de la liste"))
listRouter.post("/item", (_, res)=> res.send("ajout item dans la liste de course"));
listRouter.put("/item", (_, res)=> res.send("modifier item dans la liste de course"));
listRouter.delete("/item", (_, res)=> res.send("supprimer item dans la liste de course"));

// Export du module
// ===========================================================================================

module.exports = listRouter;
