const messageDTO = (message) => {
	return {
		email: message.email,
		text: message.text,
        date: message.date
	};
};

module.exports = messageDTO;