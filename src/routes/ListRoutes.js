const listRouter = require("express").Router();
const {
	listAll,
	addItemToShopList,
	deleteItemInList,
	updateItemInList,
	getOneItem
} = require("../controllers/ListControllers.js");
const { jwtAuth } = require("../middleWare/jwtAuth");

listRouter.get("/", jwtAuth, listAll);
listRouter.get("/item/:id", jwtAuth, getOneItem );
listRouter.post("/item", jwtAuth, addItemToShopList);
listRouter.put("/item/:id", jwtAuth, updateItemInList);
listRouter.delete("/item/:id", jwtAuth, deleteItemInList);

// Export du module
// ===========================================================================================

module.exports = listRouter;
