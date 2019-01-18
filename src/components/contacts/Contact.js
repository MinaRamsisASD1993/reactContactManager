import React, { Component } from "react";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
class Contact extends Component {
  state = {
    showContact: false
  };
  onArrowClick = () => {
    this.setState({ showContact: !this.state.showContact });
  };

  onDeleteClick = async (dispatch, id) => {
    // Let's mimic that the backend is gonna actually delete that contact before deleting it from the dom
    // response is an empty Object
    const action = {
      type: "DELETE_CONTACT",
      payload: id
    };
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch(action);
    } catch (e) {
      dispatch(action);
    }
  };
  render() {
    const { contact } = this.props;
    const { name, email, phone, id } = contact;

    let output;
    if (this.state.showContact) {
      output = (
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      );
    } else {
      output = null;
    }

    return (
      <Consumer>
        {value => {
          // value is like this -> { contacts: [], dispatch: function(){} }
          const { dispatch } = value;
          return (
            <div className="card my-3">
              <div className="card-body">
                <h5 className="card-title">
                  {name}
                  <i className="fa fa-angle-down" onClick={this.onArrowClick} />
                  <Link to={`/contacts/edit/${id}`}>
                    <i className="fa fa-pencil" />
                  </Link>
                  <i
                    className="fa fa-trash"
                    onClick={this.onDeleteClick.bind(this, dispatch, id)}
                  />
                </h5>
                {output}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
