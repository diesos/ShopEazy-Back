const mongoose = require('mongoose');

// Define the schema
const itemSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true },
  acheté: { type: Boolean, default: false },
});

// Create the model
const Item = mongoose.model('Item', itemSchema);

// Function to create an item
const createItem = async (nom, quantite) => {
  try {
    const item = new Item({
      nom,
      quantite,
      acheté: false,
    });

    await item.save(); // Save the document
    return { success: true, item };
  } catch (error) {
    console.error('Erreur lors de la création de l’item :', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = createItem;
