import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-3">
                <span style={{ color: "red" }}>Contact</span> Manager
              </h1>
              {contacts.map(contact => {
                return <Contact contact={contact} key={contact.id} />;
              })}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
