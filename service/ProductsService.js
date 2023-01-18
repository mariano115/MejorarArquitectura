const productsModel = require("../models/Products.model");
const { loggerDeclaration } = require("../tools/utils");
const logger = loggerDeclaration();

const getProducts = async () => {
  return await productsModel.find();
};

const getProductById = async (id) => {
  try {
    return await productsModel.findById(id);
  } catch (error) {
    logger.warn("error in get product method getProductById");
    return { error: "error in get product" };
  }
};

const addProduct = (product) => {
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
    productsModel.create(product);
  } else {
    logger.warn("error in creating product method addProduct");
    return { error: "error in creating product" };
  }
};

const deleteProductById = async (id) => {
  try {
    return await productsModel.deleteOne({ id });
  } catch (error) {
    logger.warn("error in deleting product method deleteProductById");
    return { error: "error in deleting product" };
  }
};

const updateProductById = async (id, product) => {
  try {
    return await productsModel.findByIdAndUpdate(
      { _id: id },
      { ...product },
      { returnOriginal: false }
    );
  } catch (error) {
    logger.warn("error in modify product method updateProductById");
    return { error: "error in modify product" };
  }
};

module.exports = { getProducts, addProduct, getProductById, deleteProductById, updateProductById };