import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import ShopShow from "./ShopShow";
function App() {
  // 6f9c9c79da07d743 apiキー
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/show" component={ShopShow} />
      </Switch>
    </div>
  );
}

export default App;
