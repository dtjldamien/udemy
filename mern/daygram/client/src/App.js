import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import "./App.css";

import NavBar from "./components/Navbar";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import FollowingPosts from "./components/screens/FollowingPosts"

import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // control flow
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route path="/create">
        <CreatePost />
      </Route>

      <Route path="/profile/:userId">
        <UserProfile />
      </Route>

      <Route path="/followingPosts">
        <FollowingPosts />
      </Route>

    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // without route exact path, home will show up on every page
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
