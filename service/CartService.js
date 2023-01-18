const cartModel = require("../models/Cart.model");
const ProductService  = require("./ProductsService");
const { loggerDeclaration } = require("../tools/utils");
const logger = loggerDeclaration();

const getCarts = async () => {
    try {
      return await cartModel.find()
    } catch (error) {
      return { error: "cart not found" };
    }
}

const getCartById = async (id) => {
  try {
    return await cartModel.findById(id);
  } catch (error) {
    return { error: "cart not found" };
  }
};

const generatePurchaseSummary = async (cart) => {
  try {
    const itemsList = cart.items
      .map((item) => {
        return `Producto: ${item.product.description} Cantidad ${item.quantity} Categoria ${item.product.category} Precio C/U ${item.product.price}
        Photo ${item.product.photo} Total: ${item.product.price * item.quantity} <br> `;
      })
      .join("");
    return itemsList;
  } catch (error) {
    logger.warn("No se pudo crear el resumen de productos");
    return error;
  }
};

const addProductToCart = async (idProduct, idCart, cantidad) => {
  try {
    const productToAdd = await ProductService.getProductById(idProduct);
    const cart = await cartModel.updateOne(
      { _id: idCart },
      {
        $push: { items: { product: productToAdd, quantity: cantidad } },
      }
    );
    if (cart.modifiedCount > 0) {
      logger.info('se pudo agregar el producto al carrito')
			return "El producto fue agregado correctamente"
    } else {
      logger.info('No se pudo agregar el producto al carrito')
      return "No se pudo agregar el producto al carrito"
    }
  } catch (error) {
    logger.warn('Hubo un problema al agregar el producto al carrito')
    return error;
  }
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
  getCarts
};
