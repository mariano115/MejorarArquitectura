const productDTO = (product) => {
	return {
		description: product.description,
		price: product.price,
        category: product.category,
        photo: product.photo
	};
};

module.exports = productDTO;