const cartModel = require("../models/Cart.model");
const cartService = require("../service/CartService");

const getCarts = async (req, res) => {
  res.send(await cartService.getCarts());
};

const getCartById = async (req, res) => {
  res.send(await cartService.getCartById(req.params.id));
};

const generatePurchaseSummary = async (cart) => {
  return await cartService.generatePurchaseSummary(cart);
};

const addProductToCart = async (req, res) => {
  return await cartService.addProductToCart(
    req.body.idProducto,
    req.body.idCarrito,
    req.body.cantidad
  );
};

const createEmptyCart = async (email, address) => {
  return await cartModel.create({
    email,
    date: new Date().toISOString(),
    items: [],
    address,
  });
};

module.exports = {
  getCartById,
  addProductToCart,
  createEmptyCart,
  generatePurchaseSummary,
  getCarts,
};
