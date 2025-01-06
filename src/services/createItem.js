const createItem = async (nom, quantite) => {
	try {
	  const itemData = {
		nom,
		quantite,
		acheté: false,
	  };

	  const item = await Item.create(itemData);

	  return { success: true, item };
	} catch (error) {
	  console.error('Erreur lors de la création de l’item :', error.message);
	  return { success: false, error: error.message };
	}
  };

  module.exports = createItem;
