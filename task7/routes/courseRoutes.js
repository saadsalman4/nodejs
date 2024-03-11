const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/courses", courseController.get);
router.post("/courses", courseController.post);
router.patch("/courses/:id", courseController.patch);
router.delete("/courses/:id", courseController.delete);

module.exports = router;
