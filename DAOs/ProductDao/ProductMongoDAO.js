const productModel = require("../../models/Products.model");

module.exports = class ProductMongoDb {
  constructor() {}

  async find() {
    return await productModel.find();
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async addProduct(product) {
    return await productModel.create(product);
  }

  async deleteProductById(id) {
    return await productModel.deleteOne({ _id: id });
  }

  async updateProductById(id, product) {
    return await productModel.findByIdAndUpdate(
      { _id: id },
      { ...product },
      { returnOriginal: false }
    );
  }

  static returnSingleton() {
    if (!this.instance) {
      this.instance = new ProductMongoDb();
    }
    return this.instance;
  }
};