import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../apis/book-api";

const AddBookForm = () => {
  const [bookData, setbookData] = useState({
    isbn: "",
    title: "",
    author: "",
    totalQuantity: "",
    issuedQuantity: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(bookData);
    await addBook(bookData);
    navigate("/");
  };

  const handleChange = (e) => {
    setbookData({ ...bookData, [e.target.name]: e.target.value });
  };

  return (
    <section className="app-section">
      <h1>Add a new book.</h1>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>ISBN</label>
          <input
            type="text"
            name="isbn"
            placeholder="isbn"
            required={true}
            onChange={handleChange}
            value={bookData.isbn}
          />
        </div>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            required={true}
            onChange={handleChange}
            value={bookData.title}
          />
        </div>
        <div className="field">
          <label>Author</label>
          <input
            type="text"
            name="author"
            placeholder="Author name"
            value={bookData.author}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="field">
          <label>Total Quantity</label>
          <input
            type="number"
            name="totalQuantity"
            placeholder="Total Quantity"
            value={bookData.totalQuantity}
            onChange={handleChange}
            required={true}
            min={1}
          />
        </div>
        <div className="field">
          <label>Issued Quantity</label>
          <input
            type="number"
            name="issuedQuantity"
            placeholder="Issued Quantity"
            value={bookData.issuedQuantity}
            onChange={handleChange}
            required = {true}
            min={0}
          />
        </div>
        <div className="field">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={bookData.price}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddBookForm;
