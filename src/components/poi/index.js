import React from "react";
import { Icon, Menu, Table, Search } from "semantic-ui-react";

class Poi extends React.Component {
  constructor(props) {
    super(props);

    this.setState({
      info: "",
      finalInfo: "",
      keys: "",
      userInput: ""
    });
  }

   /* 
  On initial mount fetch information from the API and set state
*/
  componentDidMount = async () => {
    try {
      const response = await fetch("http://localhost:5555/poi");
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
    if (this.state.finalInfo === undefined || this.state.userInput === "") {
      return this.state.info.map(item => {
        return (
          <Table.Row key={item.poi_id}>
            <Table.Cell>{item.poi_id}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.lat}</Table.Cell>
            <Table.Cell>{item.lon}</Table.Cell>
          </Table.Row>
        );
      });
    } else {
      return this.state.finalInfo.map(item => {
        return (
          <Table.Row key={item.poi_id}>
            <Table.Cell>{item.poi_id}</Table.Cell>
            <Table.Cell>
              {item.name.split("").map((letter, ind) => {
                for (let i = 0; i < item.index.length; i++) {
                  if (ind === item.index[i]) {
                    return <strong>{letter}</strong>;
                  }else{
                  return <i>{letter}</i>
                  }
                }
              })}
            </Table.Cell>
            <Table.Cell>{item.lat}</Table.Cell>
            <Table.Cell>{item.lon}</Table.Cell>
          </Table.Row>
        );
      });
    }
  }

  /* 
  Fuzzy search implementation
*/
  fuzzy = e => {
    let input = e.target.value;
    let namesThatMatch = [];
    input = input.toLocaleLowerCase().split("");
    this.state.info.map(term => {
      let placeOfMatchedTerm = [];
      term = term.name.toLowerCase().split("");
      // name is split into array

      input.map(letter => {
        // check per letter
        for (let i = 0; i < term.length; i++) {
          if (term[i] === letter) {
            placeOfMatchedTerm.push(i);
            break;
          }
        }
        // if doesnt exist add a false to flag this name
        if (placeOfMatchedTerm.length === 0) {
          placeOfMatchedTerm.push(false);
        }
      });

      // Adding the names that match to an array allong with their locations
      if (!placeOfMatchedTerm.includes(false)) {
        namesThatMatch.push({
          name: term.join(""),
          index: placeOfMatchedTerm
        });
      }
    });

    let secondInfo = this.state.info.filter(item => {
      for (let i = 0; i < namesThatMatch.length; i++) {
        if (item.name.toLowerCase() === namesThatMatch[i].name) {
          item.index = namesThatMatch[i].index;
          return item;
        }
      }
    });
    let finalInfo = secondInfo.filter(item => {
      return item.index.length === input.length;
    });

    this.setState({
      userInput: e.target.value,
      finalInfo: finalInfo
    });
  };

  render() {
    if (this.state === null) {
    } else {
      console.log(this.state);
    }

    if (this.state === null) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="center">
          <Search onSearchChange={this.fuzzy} />
          <Table celled style={{ maxWidth: "800px" }}>
            <Table.Header>
              <Table.Row>{this.tableHeaderRender()}</Table.Row>
            </Table.Header>

            <Table.Body>{this.tableHeaderRowRender()}</Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
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

export default Poi;
