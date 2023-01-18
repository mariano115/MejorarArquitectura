const messagesModel = require("../models/Messages.model");
const { loggerDeclaration } = require("../tools/utils");
const logger = loggerDeclaration();

const getMessages = async () => {
  return await messagesModel.find();
};

const getMessagesById = async (id) => {
  try {
    return await messagesModel.findById(id);
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
    messagesModel.create(message);
    return "Mensaje añadido"
  } else {
    logger.warn("error in creating message method addMessage");
    return { error: "error in creating message" };
  }
};

module.exports = { getMessages, getMessagesById, addMessage };
