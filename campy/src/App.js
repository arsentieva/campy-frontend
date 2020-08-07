import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { AddLocation } from './components/AddLocation'
import { LocationList } from './components/LocationList'
import { LocationDetail } from './components/LocationDetail'
import { AccountPage } from './components/AccountPage'
import { Reviews } from './components/Reviews'
import { AddReview } from './components/AddReview'
import { EditLocation } from './components/EditLocation'
import { Messages } from './components/Messages'
import { MessageDetail } from './components/MessageDetail'
import {Footer} from './components/Footer'

import { } from './components/Messages'
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <Router>
      <CssBaseline>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/add-location" component={AddLocation} />
          <Route path="/location-detail/:id" component={LocationDetail} />
          <Route path="/location-list" component={LocationList} />
          <Route path="/account" component={AccountPage} />
          <Route path='/reviews' component={Reviews}/>
          <Route path='/add-review' component={AddReview}/>
          <Route path='/edit-location' component={EditLocation}/>
          <Route path='/messages' component={Messages}/>
          <Route path='/message-detail' component={MessageDetail}/>
        </Switch>
        <Footer />
      </CssBaseline>
    </Router>
  );
}

export default App;
