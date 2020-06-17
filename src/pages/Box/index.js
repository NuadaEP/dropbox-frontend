import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";
import pt from "date-fns/locale/pt";

import api from "../../services/api";
import logo from "../../assets/logo.svg";

import "./styles.css";

export default class Box extends Component {
  state = { box: {} };

  async componentDidMount() {
    this.subscribeToNewFiles();

    const { id } = this.props.match.params;

    const { data: box } = await api.get(`boxes/${id}`);

    this.setState({ box });
  }

  subscribeToNewFiles = () => {
    const { id } = this.props.match.params;

    const io = socket(process.env.REACT_APP_API_URL);

    io.emit("connectRoom", id);

    io.on("file", (data) => {
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files] },
      });
    });
  };

  handleUpload = (files) => {
    files.forEach((file) => {
      const data = new FormData();

      const { id } = this.props.match.params;

      data.append("file", file);

      api.post(`boxes/${id}/files`, data);
    });
  };

  render() {
    const { box } = this.state;

    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="uploaded images" />
          <h1>{box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />

              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {box.files &&
            box.files.map((file) => (
              <li key={file._id}>
                <a
                  href={file.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="fileInfo"
                >
                  <MdInsertDriveFile size={24} color="#A5Cfff" />
                  <strong>{file.title}</strong>
                </a>

                <span>
                  Há{" "}
                  {distanceInWords(file.createdAt, new Date(), { locale: pt })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
