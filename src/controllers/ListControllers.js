const { createItem } = require('../services/createItem');


const listAll = async (req, res) => {

	res.send("Get list");
}

const createItemInList = async (req, res) => {

	const { name, quantity } = req.body;
	try {
		const item = await createItem(name, quantity);
		// res.status(201).json(item);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

const deleteItemInList = async (req, res) => {
	res.send("Delete item");
}

const updateItemInList = async (req, res) => {
	res.send("Update item");
}

module.exports = { listAll, createItemInList, deleteItemInList, updateItemInList };
