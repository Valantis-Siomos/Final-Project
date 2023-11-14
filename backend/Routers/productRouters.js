const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authorization");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductsByCategory,
  getProductById,
} = require("../controllers/productControllers");

router.get("/", getAllProducts);
router.get("/categories", getCategories);
router.get("/category/:category",getProductsByCategory);
router.get("/:id",getProductById);
router.post("/create",verifyToken, createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

//router.put("/:product/:id", updateProduct);
//router.post("/create", verifyToken, createProduct);