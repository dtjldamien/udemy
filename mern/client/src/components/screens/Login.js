import React from "react";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="my-card">
      <div class="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button class="btn waves-effect waves-light #64b5f6 blue darken-1">
          Login
        </button>
        <h5>
          <Link to="/login">Don't have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
