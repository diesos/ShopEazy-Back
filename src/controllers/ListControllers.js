require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModels.js");
const { createItem } = require("../services/createItem");
const { verifyUser } = require("../services/authService");


// List all items in the list
// ============================================================================

const listAll = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const user = await verifyUser(token);

    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    if (!user.shopList || user.shopList.length === 0) {
      return res.status(404).json({ success: false, error: "Shop list is empty" });
    }

    res.status(200).json({ success: true, shopList: user.shopList });
  }
  catch (error) {
      console.error("Erreur lors de la récupération de la shopList :", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
};

// Add item to the list
// ============================================================================

const addItemToShopList = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const user = await verifyUser(token);

    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const { nom, quantite } = req.body;

    const result = await createItem(nom, quantite);

    if (!result.success) {
      return res.status(500).json({ success: false, error: result.error });
    }

    // Ajouter l'item à la shopList de l'utilisateur
    user.shopList.push(result.item._id);

    await user.save();

    res.status(200).json({ success: true, item: result.item });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la shopList  :", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};


// Delete item in the list
// ============================================================================

const deleteItemInList = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const user = await verifyUser(token);

    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { id } = req.body;

    if (!user.shopList.includes(id)) {
      return res.status(404).json({ success: false, error: "Item non trouvé dans la liste" });
    }

    // Suppression de l'item dans la shopList
    user.shopList.pull(id);

    await user.save();

    res.status(200).json({ success: true, item: result.item });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la shopList  :", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update item in the list
// ============================================================================

const updateItemInList = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const user = await verifyUser(token);

    const { id } = req.body;

    if (!user.shopList.includes(id)) {
      return res.status(404).json({ success: false, error: "Item non trouvé dans la liste" });
    }

    // Suppression de l'item dans la shopList
    user.shopList.findOneAndUpdate(id);

    await user.save();

    res.status(200).json({ success: true, item: result.item });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la shopList  :", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  listAll,
  addItemToShopList,
  deleteItemInList,
  updateItemInList,
};
