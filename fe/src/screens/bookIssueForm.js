import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { getAllBooks } from "../apis/book-api";
import { getStudents } from "../apis/user-apis";
import { addNewIssue } from "../apis/book-issue-api";

const IssueBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBook = location.state?.selectedBook || null;

  const [bookData, setbookData] = useState({
    issuedTo: "",
    bookIsbn: "",
  });

  const [bookOptions, setbookOptions] = useState([]);
  const [studentOptions, setstudentOptions] = useState([]);

  useEffect(() => {
    getStudents().then((studentList) => {
      setstudentOptions(
        studentList.map((student) => {
          return {
            value: student._id,
            label: `${student.firstName} ${student.lastName}`,
          };
        })
      );
    });
    getAllBooks().then((bookList) => {
      const options = bookList.map((book) => ({
        value: book.isbn,
        label: `${book.title} by ${book.author}`,
      }));
      setbookOptions(options);
      if (selectedBook) {
        const match = options.find((opt) => opt.value === selectedBook.isbn);
        if (match) {
          setbookData((prev) => ({
            ...prev,
            bookIsbn: match.value,
          }));
        }
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewIssue(bookData);
    navigate("/");
  };

  return (
    <section className="app-section">
      <h1>Issue Book.</h1>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Select Student</label>
          <Select
            options={studentOptions}
            defaultInputValue="Select Student"
            isSearchable={true}
            onChange={({ value }) => {
              setbookData({ ...bookData, issuedTo: value });
            }}
          />
        </div>
        <div className="field">
          <label>Select Book</label>
          <Select
            options={bookOptions}
            placeholder="Select Book"
            value={
              bookOptions.find((opt) => opt.value === bookData.bookIsbn) || null
            }
            isSearchable={true}
            onChange={({ value }) => {
              setbookData({ ...bookData, bookIsbn: value });
            }}
          />
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default IssueBook;
