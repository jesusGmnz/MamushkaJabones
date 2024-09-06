import express from "express";
import { Server } from "socket.io";
import socketProducts from "./webSocket.js";
import __dirname from "./utils/utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import productRouter from "./routes/productRouter.js";
import connectDB from "./config/configServer.js"

const app = express();

//Configuracion Handlebars 
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/../views");
app.set("view engine", "handlebars");

//Configuracion Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/js", express.static(__dirname + "/path/to/js"));

//rutas
app.use("/", viewsRouter);
app.use("/api/products", productRouter);

//conexion a la basa de datos
connectDB();

//servidor
const PORT = 8080;
const httpServer = app.listen(PORT, ()=>{
    try {
        console.log(`server listening on port ${PORT}`);
        console.log(`\t 1.http://localhost:${PORT}/api/products`);
        console.log(`\t 1.http://localhost:${PORT}/api/carts`);
        console.log(`\t 1.http://localhost:${PORT}/realtimeproducts`);
    } catch (err) {
        console.log(err);
    }
});

//Socket.io
const socketServer = new Server(httpServer);
socketProducts(socketServer);