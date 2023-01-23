const ProductService = require("./ProductsService");
const { loggerDeclaration } = require("../tools/utils");
const MyConnectionFactory = require("../DAOs/CartDao/CartFactoryDAO");
const cartDTO = require("../DTOs/CartDTO");
const connectionDbb = new MyConnectionFactory().returnDbConnection();
const logger = loggerDeclaration();

const getCarts = async () => {
  try {
    return await connectionDbb.getCarts();
  } catch (error) {
    return { error: "cart not found" };
  }
};

const getCartById = async (id) => {
  try {
    return cartDTO(await connectionDbb.getCartById(id));
  } catch (error) {
    return { error: "cart not found" };
  }
};

const generatePurchaseSummary = async (cart) => {
  try {
    const itemsList = cart.items
      .map((item) => {
        return `Producto: ${item.product.description} Cantidad ${
          item.quantity
        } Categoria ${item.product.category} Precio C/U ${item.product.price}
        Photo ${item.product.photo} Total: ${
          item.product.price * item.quantity
        } <br> `;
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
    const cart = await connectionDbb.addProductToCart(
      idCart,
      productToAdd,
      cantidad
    );
    if (cart.modifiedCount > 0) {
      logger.info("se pudo agregar el producto al carrito");
      return "El producto fue agregado correctamente";
    } else {
      logger.info("No se pudo agregar el producto al carrito");
      return "No se pudo agregar el producto al carrito";
    }
  } catch (error) {
    logger.warn("Hubo un problema al agregar el producto al carrito");
    return error;
  }
};

const deleteCartById = async (id) => {
  return await connectionDbb.deleteCartById(id);
};

const createEmptyCart = async (email, address) => {
  return connectionDbb.createEmptyCart(email, address);
};

module.exports = {
  getCartById,
  addProductToCart,
  createEmptyCart,
  generatePurchaseSummary,
  getCarts,
  deleteCartById,
};

/* const cart = await cartModel.updateOne(
      { _id: idCart },
      {
        $push: { items: { product: productToAdd, quantity: cantidad } },
      }
    ); */
