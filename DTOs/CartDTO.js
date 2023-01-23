const cartDTO = (cart) => {
	return {
		email: cart.email,
		items: cart.items,
		address: cart.address,
        date: cart.date
	};
};

module.exports = cartDTO;