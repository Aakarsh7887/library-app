const express = require("express");
const bookController = require("../controllers/book-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const { librarianMiddleware } = require("../middleware/librarian-middleware");
const router = express.Router();

router.post("/add", authMiddleware, librarianMiddleware, bookController.addBook);
router.get("/get-books",authMiddleware,bookController.getAllBooks);

module.exports = router;