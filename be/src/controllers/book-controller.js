const inputValidationException = require("../exceptions/inputValidationException");
const Book = require("../models/book");

const addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body });
    await book.save();
    return res.status(200).send(book);
  } catch (err) {
    console.error(err);
    return res
      .status(err instanceof inputValidationException ? 400 : 500)
      .send({ message: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const booklist = await Book.find({
      $expr: { $lt: ["$issuedQuantity", "$totalQuantity"] },
    });
    return res.status(200).send(booklist);
  } catch (err) {
    console.error(err);
    return res
      .status(err instanceof inputValidationException ? 400 : 500)
      .send({ message: err.message });
  }
};

module.exports = { addBook, getAllBooks };
