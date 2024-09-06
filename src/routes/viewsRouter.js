import { Router } from "express";
import __dirname from "../utils/utils.js";
import ProductController from "../controllers/productController.js";

const productController = new ProductController();
const router = Router();


router.get("/",async(req,res)=>{
    const listadeproductos=await productController.getProductsView()
    res.render("home",{listadeproductos})
});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
});

export default router;