import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useContext } from "react";
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
import { MyMessages } from "./components/protectedRoutes/MyMessages";
import { MessageDetail } from "./components/protectedRoutes/MessageDetail";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { ProfilePicUpload } from "./components/protectedRoutes/ProfilePicUpload";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { CampyContext } from "./context/CampyContext";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function App() {
  const { authToken, currentUser, userID } = useContext(CampyContext);
  // console.log(authToken, currentUser, '****')
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline>
          {authToken !== null ? (
            <UserNavBar currentUser={currentUser} />
          ) : (
            <NavBar />
          )}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route exact path="/about" component={About} />
            <Route path="/location-detail/:id" component={LocationDetail} />
            <Route exact path="/locations" component={LocationList} />
            <Route path="/reviews" component={Reviews} />
            <ProtectedRoute
              path="/users/:userID/add-location"
              component={AddLocation}
            />
            <ProtectedRoute
              path="/users/:userID/account"
              component={AccountPage}
            />
            <ProtectedRoute
              path="/users/:userID/edit-profile-pic"
              component={ProfilePicUpload}
            />
            <ProtectedRoute
              path="/users/:userID/my-messages"
              component={MyMessages}
            />
            <ProtectedRoute
              path="/users/:userID/my-messages/:messageID"
              component={MessageDetail}
            />

            <ProtectedRoute
              path="/users/:userID/edit-account"
              component={EditAccount}
            />
            <ProtectedRoute
              path="/locations/:id/add-review"
              component={AddReview}
            />
            <ProtectedRoute path="/edit-location" component={EditLocation} />
          </Switch>
          <Footer />
        </CssBaseline>
      </Router>
    </ThemeProvider>
  );
}

export default App;
