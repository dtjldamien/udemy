import React, { useContext, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const NavBar = () => {
  const searchModal = useRef(null)
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, [])

  const renderList = () => {
    // navigation control flow
    if (state) {
      return [
        <li key="1">
          <i class="large material-icons modal-trigger" style={{ colour: "black" }}>search</i>
        </li>,
        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="3">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="4">
          <Link to="/followingPosts">Feed</Link>
        </li>,
        <li key="5">
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
        <li key="6">
          <Link to="/login">Login</Link>
        </li>,
        <li key="7">
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
          Daygram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>

      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
