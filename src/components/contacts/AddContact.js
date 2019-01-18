import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
// import uuid from "uuid";
class AddContact extends Component {
  // state "controls" the behavior of these fields .. so they are called
  // controlled components
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onChangeInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmitForm = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    // Check For Validation
    if (name === "") {
      this.setState({ errors: { name: "Name is Required!!!" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is Required!!!" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is Required!!!" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    // After 'posting' that newContact you are going to dispatch that action with payload
    // axios
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    const action = {
      type: "ADD_CONTACT",
      payload: response.data
    };
    dispatch(action);
    // Clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    // Redirect To Home Page
    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card my-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmitForm.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={this.onChangeInputHandler}
                    error={errors.name}
                  />

                  <TextInputGroup
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={this.onChangeInputHandler}
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    label="Phone"
                    type="text"
                    value={phone}
                    onChange={this.onChangeInputHandler}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-primary"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
