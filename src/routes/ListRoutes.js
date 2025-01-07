const listRouter = require("express").Router();
const {
	listAll,
	addItemToShopList,
	deleteItemInList,
	updateItemInList,
} = require("../controllers/ListControllers.js");
const { jwtAuth } = require("../middleWare/jwtAuth");

listRouter.get("/", jwtAuth, listAll);
listRouter.get("/item", jwtAuth, );
listRouter.post("/item", jwtAuth, addItemToShopList);
listRouter.put("/item", jwtAuth, updateItemInList);
listRouter.delete("/item", jwtAuth, deleteItemInList);

// Export du module
// ===========================================================================================

module.exports = listRouter;
