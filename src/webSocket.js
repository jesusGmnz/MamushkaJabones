import ProductController from "./controllers/productController.js";
import __dirname from "./utils/utils.js";

const productController = new ProductController();

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("client connected con ID:", socket.id)
        const listadeproductos = await productController.getProductsView()

        socketServer.emit("enviodeproducts", listadeproductos)

        socket.on("addProduct", async (obj) => {
            await productController.addProduct(obj)
            const listadeproductos = await productController.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

        socket.on("deleteProduct", async (id) => {

            await productController.deleteProduct(id)
            const listadeproductos = await productController.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

    })
};

export default socketProducts;