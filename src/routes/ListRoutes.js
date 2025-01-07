const listRouter = require("express").Router();
const {
	listAll,
	addItemToShopList,
	deleteItemInList,
	updateItemInList,
} = require("../controllers/ListControllers.js");

listRouter.get("/", listAll);
listRouter.get("/item", );
listRouter.post("/item", addItemToShopList);
listRouter.put("/item", updateItemInList);
listRouter.delete("/item", deleteItemInList);

// Export du module
// ===========================================================================================

module.exports = listRouter;
