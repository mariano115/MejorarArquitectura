const { loggerDeclaration } = require("../tools/utils");
const MyConnectionFactory = require("../DAOs/MessageDao/MessageFactoryDAO");
const connectionDbb = new MyConnectionFactory().returnDbConnection();
const logger = loggerDeclaration();

const getMessages = async () => {
  return await connectionDbb.getMessages();
};

const getMessagesById = async (id) => {
  try {
    return await connectionDbb.getMessagesById(id);
  } catch (error) {
    logger.warn("error in get message method getMessagesById");
    return { error: "error in get message" };
  }
};

const addMessage = (message) => {
  if (
    message.email !== undefined &&
    message.email.trim() !== "" &&
    message.email !== null &&
    message.type !== undefined &&
    message.type !== "" &&
    message.type !== null &&
    message.text !== undefined &&
    message.text.trim() !== "" &&
    message.text !== null
  ) {
    message.date = new Date().toISOString();
    connectionDbb.addMessage(message);
    return "Mensaje añadido"
  } else {
    logger.warn("error in creating message method addMessage");
    return { error: "error in creating message" };
  }
};

module.exports = { getMessages, getMessagesById, addMessage };
