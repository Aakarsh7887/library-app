const librarianMiddleware = async (req, res, next) => {
  if (req.user.type !== "LIBRARIAN") {
    return res.status(403).send({ message: "Authorization denied." });
  }
  next();
};

module.exports = { librarianMiddleware };
