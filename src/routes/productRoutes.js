const verifyAdminToken = require("../middleware/adminAuthMiddleware");
const express = require("express");
const {getProducts,getSingleProduct, createProduct, updateProduct, deleteProduct, obtenerProductsAleatoriosPorId } = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();




router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id([0-9a-fA-F]{24})", getSingleProduct);

router.get("/aleatorios", obtenerProductsAleatoriosPorId);


router.put("/:id([0-9a-fA-F]{24})",upload.single("image"), updateProduct);
router.delete("/:id([0-9a-fA-F]{24})", deleteProduct);


module.exports = router;