import { useState } from "react";
import { loginFunction } from "../utils/authUtil";
import {useNavigate, Link} from "react-router-dom";

const LoginScreen = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({email : "", password: ""});

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(credentials);
    if(validation()){
      const user = await loginFunction(credentials);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const validation = () => {
    return credentials.email?.length && credentials.password?.length;
  };

  return (
    <section className="app-section">
      <h1>Login</h1>
      <span>Don't have an account? Create  <Link to={"/signup"} >here</Link></span>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" placeholder="email" value = {credentials.email} onChange={handleChange} required ={true} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required ={true} />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginScreen;
