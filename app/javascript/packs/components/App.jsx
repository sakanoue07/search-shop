import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import ShopShow from "./ShopShow";
function App() {
  return (
    //ルーティング
    <div>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/show" component={ShopShow} />
      </Switch>
    </div>
  );
}

export default App;
