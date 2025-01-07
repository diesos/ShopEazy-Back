require("dotenv").config();
const { createItem, deleteItem, updateItem, getItem, getAllItems } = require("../services/ListServices");



// List all items in the list
// ============================================================================

const listAll = async (req, res) => {
  const user = req.user;

  // Vérifiez si l'utilisateur est connecté
  if (!user)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    // Récupération de tous les items de la shopList
    const allItems = await getAllItems(user);

    return res.status(200).json(allItems);
  }
  catch (error) {
    console.error("Erreur lors de la récupération de la shopList :", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};



// Get an items in the list
// ============================================================================

const getOneItem = async (req, res) => {
  const user = req.user;
  const itemId = req.params.id;

  // Vérifiez si l'utilisateur est connecté
  if (!user)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  // Vérifiez si la liste de courses est vide
  if (!user.shopList || user.shopList.length === 0)
    return res.status(404).json({ success: false, error: "Shop list is empty" });

  try {
    // Recherche de l'item dans la shopList
    const item = await getItem(itemId, user);

    return res.status(200).json(item);
  } catch (error) {
    console.error("Error while searching item :", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};



// Add item to the list
// ============================================================================

const addItemToShopList = async (req, res) => {
  const user = req.user;
  const item = req.body;

  // Vérifiez si l'utilisateur est connecté
  if (!user)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    // Ajout de l'item dans la shopList
    const newItem = await createItem(item, user);

    res.status(200).json(newItem);
  } catch (error) {
    console.error("Erreur lors de l'ajout à la shopList  :", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};



// Delete item in the list
// ============================================================================

const deleteItemInList = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  // Vérifiez si l'utilisateur est connecté
  if (!user)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    // Suppression de l'item dans la shopList
    const deletedItem = await deleteItem(id, user);

    res.status(200).json(deletedItem);
  } catch (error) {
    console.error("Erreur lors de l'ajout à la shopList  :", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};



// Update item in the list
// ============================================================================

const updateItemInList = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const updatedData = req.body;

  // Vérifiez si l'utilisateur est connecté
  if (!user)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  try {  
    // Mise à jour de l'item dans la shopList
    const updatedItem = await updateItem(id, user, updatedData);

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Erreur lors de l'ajout à la shopList  :", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports ={
  listAll,
  getOneItem,
  addItemToShopList,
  deleteItemInList,
  updateItemInList,
};
