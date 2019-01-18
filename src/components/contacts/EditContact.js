import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
class EditContact extends Component {
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
  onSubmitForm = async (dispatch, id, e) => {
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

    const editedContact = {
      name,
      email,
      phone
    };

    // THIS IS BEING TESTed YET
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      editedContact
    );

    // SOME STUFF GOES HERE
    const action = {
      type: "UPDATE_CONTACT",
      payload: res.data
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

  async componentDidMount() {
    const contactId = this.props.match.params.id;
    const resContact = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${contactId}`
    );
    const { name, email, phone } = resContact.data;
    this.setState({
      name,
      email,
      phone
    });
  }

  render() {
    const { name, email, phone, errors } = this.state;
    const contactId = this.props.match.params.id;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card my-3">
              <div className="card-header">Update Contact</div>
              <div className="card-body">
                <form
                  onSubmit={this.onSubmitForm.bind(this, dispatch, contactId)}
                >
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
                    value="Update Contact"
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

export default EditContact;
