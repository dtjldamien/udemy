import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    // navigation control flow
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create Post</Link>
        </li>,
        <li>
          <Link to="/followingPosts">Feed</Link>
        </li>,
        <li>
          <button
            className="btn waves-effect waves-light #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push('login')
              M.toast({ html: "Signed out successfully!", classes: "#c62828 red darken-3" });
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };

  // using href will cause the page to refresh, use link so that it looks more smooth
  // {state?"/":"/login"} checks whether the user is signed in, and redirects accordingly
  return (
    <nav>
      <div className="nav-wrapper" style={{ color: "black" }}>
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Udemy MERN
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
