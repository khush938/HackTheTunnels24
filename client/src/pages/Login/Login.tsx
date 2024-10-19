import { useState } from "react";
import { useAccountContext } from "../../context";
import { Base as Layout } from "@/layouts";
import "./Login.style.scss";

function Login() {
  // Set initial state values to empty strings
  const [email, setEmail] = useState("admin@email.com"); 
  const [password, setPassword] = useState("password"); 
  const [message, setMessage] = useState(null); 
  const { login } = useAccountContext();

  const attemptLogin = async () => {
    try {
      console.log("Email:", email); 
      console.log("Password:", password); 
      const message = await login(email, password); 
      setMessage(message); 
    } catch (error) {
      setMessage("Invalid login credentials"); 
    }
  };

  return (
    <Layout>
      <div className="Login">
        <div className="Login__background" />
        <div className="Login__content">
          <img
            src="/carleton_logo_black-removebg-preview.png"
            alt="Carleton Logo"
            className="Login__logo"
          />
          {message && <p className="error-message">{message}</p>}
          <input
            type="text"
            placeholder="Enter your MyCarletonOne username"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
          />
          <div className="Login__panel__content__checkbox">
            {/* <input type="checkbox" id="keepSignedIn" /> */}
            {/* <label htmlFor="keepSignedIn">Keep me signed in</label> */}
          </div>
          <button className="Login__button" onClick={attemptLogin}>
            Sign In
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
