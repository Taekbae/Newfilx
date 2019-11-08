import React from "react";
import {
  BrowserRouter as Router,
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
        <Route
          path="https://taekbae.github.io/Newfilx/"
          exact
          component={Home}
        />
        <Route
          path="https://taekbae.github.io/Newfilx/tv"
          exact
          component={TV}
        />
        <Route
          path="https://taekbae.github.io/Newfilx/search"
          component={Search}
        />
        <Route
          path="https://taekbae.github.io/Newfilx/movie/:id"
          component={Detail}
        />
        <Route
          path="https://taekbae.github.io/Newfilx/show/:id/seasons/:season_number"
          component={Seasons}
        />
        <Route
          path="https://taekbae.github.io/Newfilx/show/:id"
          component={Detail}
        />
        <Route
          path="https://taekbae.github.io/Newfilx/collections/:id"
          component={Collections}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
