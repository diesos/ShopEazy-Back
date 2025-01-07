const User = require("../models/userModels");



// Create item
// ============================================================================

module.exports.createItem = async (item, user) => {
  try {
    const existingUser = await User.findById(user._id);
    if (!existingUser) throw new Error('User not found');

    existingUser.shopList.push(item);
    await existingUser.save();

    return { success: true, item };
  } catch (error) {
    console.error('Erreur lors de la création de l’item :', error.message);
    return { success: false, error: error.message };
  }
};



// Delete item
// ============================================================================

module.exports.deleteItem = async (id, user) => {
  try {
    const result = await User.updateOne(
      { _id: user._id }, // Trouve l'utilisateur par son ID
      { $pull: { shopList: { _id: id } } } // Retire l'élément avec le _id correspondant
    );

    if (result.modifiedCount === 0) console.log("No item found or already removed.");
    else console.log("Item removed successfully.");

    return { success: true, item: id };
  } catch (error) {
    console.error('Erreur lors de la suppression de l’item :', error.message);
    return { success: false, error: error.message };
  }
}



// Update Item
// =============================================================================

module.exports.updateItem = async (itemId, userId, updatedData) => {
  // Préparer les champs dynamiques
  const fieldsToUpdate = {};
  if (updatedData.name) fieldsToUpdate["shopList.$.name"] = updatedData.name;
  if (updatedData.quantity) fieldsToUpdate["shopList.$.quantity"] = updatedData.quantity;
  if (updatedData.bought !== undefined) fieldsToUpdate["shopList.$.bought"] = updatedData.bought;
  
  // Vérifier qu'il y a des champs valides à mettre à jour
  if (Object.keys(fieldsToUpdate).length === 0)
    throw new Error("No valid fields provided for update");
  
  try {
    // Mettre à jour l'élément spécifique dans shopList
    const result = await User.updateOne(
      { _id: userId, "shopList._id": itemId }, // Trouver l'utilisateur et l'élément
      { $set: fieldsToUpdate } // Mettre à jour uniquement les champs spécifiés
    );

    if (result.matchedCount === 0)
      return { success: false, error: "Item not found" };

    if (result.modifiedCount === 0)
      return { success: false, error: "No changes made" };

    return { success: true, message: "Item updated successfully" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error.message);
    return { success: false, error: error.message };
  }
};



// Get One Item
// =============================================================================

module.exports.getItem = async (itemId, user) => {
  try {
    if (!user.shopList || user.shopList.length === 0)
      return { success: false, error: "Shop list is empty or not found" };
    
    const result = user.shopList.id(itemId);

    if (!result)
      return { success: false, error: "Item not found" };

    return { success: true, item: result };
  } catch (error) {
    console.error("Error while searching item:", error.message);
    return { success: false, error: error.message };
  }
};



//Get All Items
// =============================================================================

module.exports.getAllItems = async (user) => {
  try {
    user = await User.findById(user._id);
    if (!user)
      return { success: false, error: "User not found" };
    
    return { success: true, shopList: user.shopList };
  } catch (error) {
    console.error("Error while searching item:", error.message);
    return { success: false, error: error.message };
  }
}
