import React from "react";
import Poi from "./components/poi/index";
import EHourly from "./components/events/eHourly";
import EDaily from "./components/events/eDaily";
import SHourly from "./components/stats/sHourly";
import SDaily from "./components/stats/sDaily";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/poi" />
          </Route>
          <Route exact path="/poi" component={Poi} />
          <Route exact path="/events/hourly" component={EHourly} />
          <Route exact path="/events/daily" component={EDaily} />
          <Route exact path="/stats/hourly" component={SHourly} />
          <Route exact path="/stats/daily" component={SDaily} />
        </Switch>
      </div>
    );
  }
}

export default App;
