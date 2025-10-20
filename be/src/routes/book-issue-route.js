const express = require("express");
const BookIssueController = require("../controllers/book-issue-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const { librarianMiddleware } = require("../middleware/librarian-middleware");
const router = express.Router();

router.post(
  "/issued",
  authMiddleware,
  librarianMiddleware,
  BookIssueController.addBookIssue
);
router.get("/issuedlist", authMiddleware, BookIssueController.getBookIssued);
router.get("/issuedlistall", authMiddleware,librarianMiddleware, BookIssueController.getBookIssuedList);

module.exports = router;
