import { Link } from "react-router-dom";

const LibrarianHomeScreen = () => {
  return (
    <>
      <h1>Welcome librarian.</h1>
      <div class="ui cards">
        <div className="card">
          <div class="content">
            <div class="header"><Link to={"/add-book"}>Add New Book </Link></div>
            <div class="description">
              Add new book in the library.
            </div>
          </div>
        </div>
        <div className="card">
          <div class="content">
            <div class="header"><Link to={"/books"}>Available Books</Link></div>
            <div class="description">
              See the List of Available books in the library.
            </div>
          </div>
        </div>
        <div className="card">
          <div class="content">
            <div class="header"><Link to={"/issue-book"}>Issue Book</Link></div>
            <div class="description">
              Issue book to Student.
            </div>
          </div>
        </div>
        <div className="card">
          <div class="content">
            <div class="header"><Link to={"/issued-book-list"}>View Issued Books</Link></div>
            <div class="description">
              List of books which have been issued.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibrarianHomeScreen;
