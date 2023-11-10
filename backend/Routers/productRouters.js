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
} = require("../controllers/productControllers");

router.get("/", getAllProducts);
router.get("/categories", getCategories);
router.get("/category/:category",getProductsByCategory )
router.post("/create",verifyToken, createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;


//router.post("/create", verifyToken, createProduct);