import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { UserNavBar } from "./components/UserNavBar";
import { Home } from "./components/Home";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { AddLocation } from "./components/protectedRoutes/AddLocation";
import { LocationList } from "./components/LocationList";
import { LocationDetail } from "./components/LocationDetail";
import { AccountPage } from "./components/protectedRoutes/AccountPage";
import { EditAccount } from "./components/protectedRoutes/EditAccount";
import { Reviews } from "./components/Reviews";
import { AddReview } from "./components/protectedRoutes/AddReview";
import { EditLocation } from "./components/protectedRoutes/EditLocation";
import { MyLocations} from './components/protectedRoutes/MyLocations'
import { Messages } from "./components/protectedRoutes/Messages";
import { MessageDetail } from "./components/protectedRoutes/MessageDetail";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import { CssBaseline } from "@material-ui/core";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <Router>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <CssBaseline>
          {existingTokens !== null ? <UserNavBar /> : <NavBar />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <ProtectedRoute path="/add-location" component={AddLocation} />
            <ProtectedRoute path="/my-locations" component={MyLocations} />

            <Route path="/location-detail" component={LocationDetail} />
            <Route path="/locations" component={LocationList} />
            <ProtectedRoute path="/account" component={AccountPage} />
            <ProtectedRoute path="/edit-account" component={EditAccount} />
            <Route path="/reviews" component={Reviews} />
            <ProtectedRoute path="/add-review" component={AddReview} />
            <ProtectedRoute path="/edit-location" component={EditLocation} />
            <ProtectedRoute path="/messages" compoenent={Messages} />
            <ProtectedRoute path="/message-detail" component={MessageDetail} />
            <Route path="/about" compoenent={About} />
          </Switch>
          <Footer />
        </CssBaseline>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
