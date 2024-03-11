const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.get);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.post);
router.patch("/users/:id", userController.patch);
router.delete("/users/:id", userController.delete);

module.exports = router;
