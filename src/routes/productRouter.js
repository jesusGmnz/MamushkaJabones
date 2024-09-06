import { Router } from "express";
import __dirname from "../utils/utils.js";
import ProductController from "../controllers/productController.js"

const router = Router()
const productController = new ProductController();

router.get("/", async (req, res) => {
    const products = await productController.getProducts(req.query)
    res.json({products})
})

router.get("/:pid", async (req, res) => {
    const productfind = await productController.getProductbyId(req.params);
    res.json({ status: "success", productfind });
});

router.post("/", async (req, res) => {
    const newproduct = await productController.addProduct(req.body);
    res.json({ status: "success", newproduct });
});

router.put("/:pid", async (req, res) => {
    const updatedproduct = await productController.updateProduct(req.params, req.body);
    res.json({ status: "success", updatedproduct });
});


router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteproduct = await productController.deleteProduct(id);
    res.json({ status: "success", deleteproduct });
});

export default router;