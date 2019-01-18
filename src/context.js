import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";

const Context = React.createContext();
// reducer takes in old state along with action to be done
const reducer = (state, action) => {
  // action is like this -> {type: 'DELETE_CONTACT', payload: 'Something'}
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          return contact.id !== action.payload; //payload is the deleted contact Id
        })
      };
    case "ADD_CONTACT": {
      // action.payload is the (whole contact)
      if (state.contacts.length >= 11) {
        console.log("They are >= 11");
        // Generate uuid for that newContact "action.payload"
        action.payload.id = uuid();
      } else {
        console.log("They are < 11");
      }
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    }
    case "UPDATE_CONTACT": {
      const newContacts = state.contacts.map(contact => {
        if (contact.id === action.payload.id) {
          return action.payload;
        } else {
          return contact;
        }
      });

      return {
        ...state,
        contacts: newContacts
      };
    }

    default:
      return state;
  }
};

class Provider extends Component {
  state = {
    contacts: [],
    // Dispatch Function inside state to be accessible via 'value'
    dispatch: action => {
      // Setting previous state to a new one by passing current state to reducer along with the action
      this.setState(state => reducer(state, action));
    }
  };

  // Good place for grabbing data from an API ..
  // After inserting component to DOM .. after rendering happens
  // It only happens "once"
  // Get data from that API and then update state with it
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
export default Provider;
