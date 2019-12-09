import React from "react";

import { Icon, Menu, Table } from "semantic-ui-react";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      info: "",
      keys: ""
    });
  }

  /* 
  On initial mount fetch information from the API and set state
*/

  componentDidMount = async () => {
    try {
      const response = await fetch("http://localhost:5555/events/hourly");
      const data = await response.json();
      const keys = Object.keys(data[0]);
      this.setState({
        info: data,
        keys: keys
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* 
  This function renders the table headers
*/
  tableHeaderRender() {
    return this.state.keys.map(item => {
      return <Table.HeaderCell key={item}>{item}</Table.HeaderCell>;
    });
  }

  /* 
  This function renders the table
*/
  tableHeaderRowRender() {
    if (this.state === null) {
      return <h1>Loading...</h1>;
    } else {
      return this.state.info.map((item, ind) => {
        return (
          <Table.Row key={ind}>
            <Table.Cell>{item.date}</Table.Cell>
            <Table.Cell>{item.hour}</Table.Cell>
            <Table.Cell>{item.events}</Table.Cell>
          </Table.Row>
        );
      });
    }
  }

  render() {
    if (this.state === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="center">
          <Table celled style={{ maxWidth: "800px" }}>
            <Table.Header>
              <Table.Row>{this.tableHeaderRender()}</Table.Row>
            </Table.Header>

            <Table.Body>{this.tableHeaderRowRender()}</Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      );
    }
  }
}

export default Events;
