import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuExampleBasic extends Component {
  render() {
    return (
      <Menu>
        <Link to="/poi">
          <Menu.Item>Person Of Interest</Menu.Item>
        </Link>
        <Link to="/events/hourly">
          <Menu.Item>Events Hourly</Menu.Item>
        </Link>
        <Link to="/events/daily">
          <Menu.Item>Events Daily</Menu.Item>
        </Link>
        <Link to="/stats/hourly">
          <Menu.Item>Statistics Hourly</Menu.Item>
        </Link>
        <Link to="/stats/daily">
          <Menu.Item>Statistics Daily</Menu.Item>
        </Link>
      </Menu>
    );
  }
}
