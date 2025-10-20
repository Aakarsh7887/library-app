import { useState } from "react";
import { signupFunction } from "../utils/authUtil";
import { useNavigate, Link } from "react-router-dom";

const SignupScreen = () => {
  const navigate = useNavigate();

  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "STUDENT",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    if (validation()) {
      const user = await signupFunction(userData);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    return userData.email?.length && userData.password?.length;
  };

  return (
    <section className="app-section">
      <h1>SignUp</h1>
      <span>
        Already have an account? Login <Link to={"/login"}>here</Link>
      </span>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required={true}
            onChange={handleChange}
            value={userData.firstName}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required={true}
            onChange={handleChange}
            value={userData.lastName}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={userData.email}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="inline field">
          <div className="ui toggle checkbox" onClick={(e) => {
            setuserData({...userData, type: userData.type === "LIBRARIAN" ? "STUDENT" : "LIBRARIAN"});
          }}>
            <input type="checkbox" tabIndex="0" className="hidden" checked = {userData.type === "LIBRARIAN"} />
            <label>Librarian?</label>
          </div>
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupScreen;
