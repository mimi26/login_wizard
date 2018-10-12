import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Email from "./components/Email";
import Password from "./components/Password";
import Timezone from "./components/Timezone";
import Thanks from "./components/Thanks";

const Router = function Router() {
  //Check which data is still missing. Redirect to that route.
  const completedEmail = localStorage.getItem('email');
  const completedPassword = localStorage.getItem('password');
  const completedTZ = localStorage.getItem('timezone');
  let nextRoute;
  if (completedEmail && completedPassword && completedTZ) {
    nextRoute = '/thanks';
  } else {
    if (!completedEmail) {
      nextRoute = '/email';
    } else if (!completedPassword) {
      nextRoute = '/password';
    } else if (!completedTZ) {
      nextRoute = '/timezone';
    }
  }
  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route exact path='/email' component={Email} />
          <Route exact path='/password' component={Password} />
          <Route exact path='/timezone' component={Timezone} />
          <Route exact path = '/thanks' component={Thanks} />
          {/* Redirect to whichever route corresponds to properties still missing from local storage */}
          <Redirect from='/' to={nextRoute} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default Router;
