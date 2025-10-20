const mongoose = require("mongoose");
const Book = require("./book");
const BookIssueSchema = new mongoose.Schema(
  {
    bookIsbn: { type: String, required: true, ref: "Book" },
    issuedTo: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    issuedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    status: {
      type: String,
      required: true,
      default: "ISSUED",
      enum: ["ISSUED", "RETURNED"],
    },
  },
  { timestamps: true }
);

BookIssueSchema.pre("save", async function (next) {
  const BookIssue = this;
  let value = 0;
  if (BookIssue.isNew) {
    value = 1;
  } else {
    if (BookIssue.modifiedPaths().includes("status")) {
      if (BookIssue.status === "RETURNED") {
        value = -1;
      } else {
        value = 1;
      }
    }
  }

  if (value) {
    await Book.updateOne(
      { isbn: BookIssue.bookIsbn },
      { $inc: { issuedQuantity: value } }
    );
  }
});

const BookIssue = mongoose.model("BookIssue", BookIssueSchema);
module.exports = BookIssue;
