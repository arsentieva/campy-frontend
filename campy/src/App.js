import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { AddLocation } from "./components/AddLocation";
import { LocationList } from "./components/LocationList";
import { LocationDetail } from "./components/LocationDetail";
import { AccountPage } from "./components/AccountPage";
import { EditAccount } from "./components/EditAccount";
import { Reviews } from "./components/Reviews";
import { AddReview } from "./components/AddReview";
import { EditLocation } from "./components/EditLocation";
import { Messages } from "./components/Messages";
import { MessageDetail } from "./components/MessageDetail";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import UserContext from "./context/UserContext";

import {} from "./components/Messages";
import { CssBaseline } from "@material-ui/core";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/login",
        null,
        { headers: { access_token: token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/:id", {
          headers: { access_token: token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <CssBaseline>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/add-location" component={AddLocation} />
            <Route path="/location-detail" component={LocationDetail} />
            <Route path="/locations" component={LocationList} />
            <Route path="/account" component={AccountPage} />
            <Route path="/edit-account" component={EditAccount} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/add-review" component={AddReview} />
            <Route path="/edit-location" component={EditLocation} />
            <Route path="/messages" compoenent={Messages} />
            <Route path="/message-detail" component={MessageDetail} />
            <Route path="/about" compoenent={About} />
          </Switch>
          <Footer />
        </CssBaseline>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
