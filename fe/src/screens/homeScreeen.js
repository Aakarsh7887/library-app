import { useEffect, useState } from "react";
import { getLocalStorage, logoutFunction } from "../utils/authUtil";
import LibrarianHomeScreen from "./librarianHomeScreen";
import StudentHomeScreen from "./studentHomeScreen";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [userType, setuserType] = useState("");

  useEffect(() => {
    const user = getLocalStorage();
    if (user) {
      setuserType(user.type);
    }
  }, []);

  const navigate = useNavigate();

  if (!userType.length) {
    return <p>Loading...</p>;
  }

  const getScreen = () => {
    return userType === "LIBRARIAN" ? (
      <LibrarianHomeScreen />
    ) : (
      <StudentHomeScreen />
    );
  };

  return (
    <section className="app-section">
      <button
        className="ui secondary button"
        onClick={async () => {
          await logoutFunction();
          navigate("/login");
        }}
      >
        Logout
      </button>
      {getScreen()}
    </section>
  );
};

export default HomeScreen;
