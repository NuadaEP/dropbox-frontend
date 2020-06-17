import React, { Component } from "react";

import logo from "../../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";

export default class Main extends Component {
  state = {
    newBox: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { data } = await api.post("boxes", {
      title: this.state.newBox,
    });

    this.props.history.push(`/box/${data._id}`);
  };

  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="application logo" />
          <input
            placeholder="Criar um box"
            value={this.state.newBox}
            onChange={({ target }) => this.setState({ newBox: target.value })}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    );
  }
}
