const cartModel = require("../../models/Cart.model");

module.exports = class CartMongoDb {
  constructor() {}

  async getCarts() {
    return await cartModel.find();
  }

  async getCartById(id) {
    return await cartModel.findById(id);
  }

  async createEmptyCart(email, address) {
    return await cartModel.create({
      email,
      date: new Date().toISOString(),
      items: [],
      address,
    });
  }

  async addProductToCart(idCart, productToAdd, cantidad) {
    return await cartModel.updateOne(
      { _id: idCart },
      {
        $push: { items: { product: productToAdd, quantity: cantidad } },
      }
    );
  }

  async deleteCartById(id) {
    return await cartModel.deleteOne({ _id: id });
  }

  async updateProductById(id, product) {
    return await cartModel.findByIdAndUpdate(
      { _id: id },
      { ...product },
      { returnOriginal: false }
    );
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new CartMongoDb();
    }
    return this.instance;
  }
};
