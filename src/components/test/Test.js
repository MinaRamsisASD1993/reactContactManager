import React, { Component } from "react";

class Test extends Component {
  constructor() {
    super();
    console.log("constructor ran ...");
    this.state = {};
  }
  componentDidMount() {
    console.log("componentDidMount...");
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  render() {
    console.log("component rendered...");
    return (
      <div>
        <h1>Test Component</h1>
      </div>
    );
  }
}

export default Test;
