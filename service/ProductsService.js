const productsModel = require("../models/Products.model");
const { loggerDeclaration } = require("../tools/utils");
const MyConnectionFactory = require("../DAOs/ProductDao/ProductFactoryDAO");
const productDTO = require("../DTOs/ProductDTO");
const connectionDbb = new MyConnectionFactory().returnDbConnection();
const logger = loggerDeclaration();

const getProducts = async () => {
  const products = await connectionDbb.find();
  const productsDTO = products.map((product) => productDTO(product));
  return productsDTO;
};

const getProductById = async (id) => {
  try {
    return productDTO(await connectionDbb.getProductById(id));
  } catch (error) {
    console.log(error);
    logger.warn("error in get product method getProductById");
    return { error: "error in get product" };
  }
};

const addProduct = async (product) => {
  if (
    product.description !== undefined &&
    product.description.trim() !== "" &&
    product.description !== null &&
    product.price !== undefined &&
    product.price !== "" &&
    product.price !== null &&
    product.category !== undefined &&
    product.category.trim() !== "" &&
    product.category !== null &&
    product.photo !== undefined &&
    product.photo.trim() !== "" &&
    product.photo !== null
  ) {
    await connectionDbb.addProduct(product);
  } else {
    logger.warn("error in creating product method addProduct");
    return { error: "error in creating product" };
  }
};

const deleteProductById = async (id) => {
  try {
    return await connectionDbb.deleteProductById(id);
  } catch (error) {
    logger.warn("error in deleting product method deleteProductById");
    return { error: "error in deleting product" };
  }
};

const updateProductById = async (id, product) => {
  try {
    return connectionDbb.updateProductById(id, product);
  } catch (error) {
    logger.warn("error in modify product method updateProductById");
    return { error: "error in modify product" };
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
