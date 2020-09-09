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
import {UploadLocationPics} from'./components/protectedRoutes/UploadLocationPics'
import { Footer } from "./components/Footer";
import { ProfilePicUpload } from "./components/protectedRoutes/ProfilePicUpload";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { CampyContext } from "./CampyContext";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function App() {
  const { authToken } = useContext(CampyContext);
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline>
          {authToken !== null ? (<UserNavBar />) : (<NavBar />)}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route exact path="/about" component={About} />
            <Route exact path="/location-detail/:id" component={LocationDetail} />
            <Route exact path="/locations" component={LocationList} />
            <Route path="/reviews" component={Reviews} />
            <ProtectedRoute
              path="/user/add-location"
              component={AddLocation}
            />
            <ProtectedRoute
              path="/user/account"
              component={AccountPage}
            />
            <ProtectedRoute
              path="/user/edit-profile-pic"
              component={ProfilePicUpload}
            />
            <ProtectedRoute
              path="/user/messages"
              component={MyMessages}
            />
            <ProtectedRoute
              path="/user/messages/:messageID"
              component={MessageDetail}
            />

            <ProtectedRoute
              path="/user/edit-account"
              component={EditAccount}
            />
            <ProtectedRoute
              path="/locations/:id/add-review"
              component={AddReview}
            />
            <ProtectedRoute path="/edit-location" component={EditLocation} />
            <ProtectedRoute path="/locations/:id/edit-location-pic" component={UploadLocationPics} />
          </Switch>
          <Footer />
        </CssBaseline>
      </Router>
    </ThemeProvider>
  );
}

export default App;
