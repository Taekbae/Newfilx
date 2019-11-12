import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Header from "Components/Header";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Collections from "Routes/Collections";
import Seasons from "Routes/Seasons";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id/seasons/:season_number" component={Seasons} />
        <Route path="/show/:id" component={Detail} />
        <Route path="/collections/:id" component={Collections} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
