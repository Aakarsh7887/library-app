const BookIssue = require("../models/bookIssue");

const addBookIssue = async (req, res) => {
  try {
    const bookIssue = new BookIssue({ ...req.body, issuedBy: req.user._id });
    await bookIssue.save();
    return res.status(201).send({ message: "saved" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

const getBookIssued = async (req, res) => {
  let query;
  if (req.user.type === "LIBRARIAN") {
    query = { issuedTo: req.query.studentId };
  } else {
    query = { issuedTo: req.user._id };
  }
  if (req.query.status) {
    query = { ...query, status: req.query.status };
  }
  const issuedList = await BookIssue.find(query);
  console.info(
    `Found: ${issuedList.length} book issues for the student ID: ${req.query.studentId} for the given filters.`
  );
  return res.status(200).send(issuedList);
};

const getBookIssuedList = async (req, res) => {
  const issuedList = await BookIssue.find({ status: req.query.status });
  console.info(
    `Found: ${issuedList.length} book issued.`
  );
  return res.status(200).send(issuedList);
};

module.exports = { addBookIssue, getBookIssued, getBookIssuedList };
