import { useState, useEffect } from "react";
import { getAllBooks } from "../apis/book-api";
import { getLocalStorage } from "../utils/authUtil";
import { useNavigate } from "react-router-dom";


const numberFormatter = new Intl.NumberFormat("en-IN", {
  currency: "INR",
  style: "currency",
});

const formatCurrency = (value) => {
  return numberFormatter.format(value);
};

const BookScreen = () => {
    const [bookList, setbookList] = useState([]);
    const [userType, setuserType] = useState("STUDENT");
    
  const fetchBooks = async () => {
    const books = await getAllBooks();
    setbookList(books);
  };

  const navigate = useNavigate();

  useEffect(() => {
    setuserType(getLocalStorage().type);
    fetchBooks()
      .then()
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="app-section">
      <h1>List Of Available books</h1>
      <table className="ui single line table">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Total Quantity</th>
            <th>Issued Quantity</th>
            {userType === "LIBRARIAN" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {bookList.map((book) => {
            return (
              <tr>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{formatCurrency(book.price)}</td>
                <td>{book.totalQuantity}</td>
                <td>{book.issuedQuantity}</td>
                {userType === "LIBRARIAN" && <td>
                  <button
                    className="positive ui button"
                    disabled={book.issuedQuantity >= book.totalQuantity}
                    onClick={(e) => navigate("/issue-book", { state: { selectedBook: book } })}
                  >
                    Issue
                  </button>
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default BookScreen;
