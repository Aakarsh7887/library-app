import { useEffect, useState } from "react";
import { getIssuedList, getIssuedListForStudent } from "../apis/book-issue-api";
import { getLocalStorage } from "../utils/authUtil";

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const formatDate = (date) => dateFormatter.format(date);

const IssuedBooks = () => {
  const [issuedList, setissuedList] = useState([]);
  const [selectedStatus, setselectedStatus] = useState("ISSUED");


  useEffect(() => {
    const type = getLocalStorage().type;
    if (type === "STUDENT") {
      getIssuedListForStudent(selectedStatus).then((list) => {
        setissuedList(list);
      });
    } else {
      getIssuedList(selectedStatus).then((list) => {
        setissuedList(list);
      });
    }
  }, [selectedStatus]);

  return (
    <section className="app-section">
      <h1>List Of Issued books</h1>
      <table className="ui single line table">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Student ID</th>
            <th>ISSUE DATE</th>
          </tr>
        </thead>
        <tbody>
          {issuedList.map((book) => {
            return (
              <tr>
                <td>{book.bookIsbn}</td>
                <td>{book.issuedTo}</td>
                <td>{formatDate(new Date(book.createdAt))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default IssuedBooks;
