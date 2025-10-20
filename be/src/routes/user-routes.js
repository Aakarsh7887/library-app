const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controllers");
const { authMiddleware } = require("../middleware/auth-middleware");
const { librarianMiddleware } = require("../middleware/librarian-middleware");

router.post("/signup", UserController.addNewUser);
router.post("/login", UserController.loginUser);
router.get("/logout", authMiddleware, UserController.logoutUser);
router.get(
  "/get-students",
  authMiddleware,
  librarianMiddleware,
  UserController.getStudents
);

module.exports = router;
