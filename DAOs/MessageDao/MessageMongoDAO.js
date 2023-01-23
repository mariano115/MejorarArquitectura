const messagesModel = require("../../models/Messages.model");

module.exports = class MessageMongoDAO {
  constructor() {}

  async getMessages() {
    return await messagesModel.find();
  }

  async getMessagesById(id) {
    return await messagesModel.findById(id);
  }

  async addMessage(message) {
    return await messagesModel.create(message);
  }
/* 
  async deleteProductById(id) {
    return await messagesModel.deleteOne({ _id: id });
  }

  async updateProductById(id, product) {
    return await messagesModel.findByIdAndUpdate(
      { _id: id },
      { ...product },
      { returnOriginal: false }
    );
  }
 */
  static returnSingleton() {
    if (!this.instance) {
      this.instance = new MessageMongoDAO();
    }
    return this.instance;
  }
};