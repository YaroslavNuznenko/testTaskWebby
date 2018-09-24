import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../store/actions/movie";

class UploadFile extends Component {
  uploadFileHandler(event) {
    console.log(event.target);
    event.preventDefault();
    let formData = new FormData(event.target);
    fetch("/api/upload", {
      method: "POST",
      body: formData,

      credentials: "same-origin"
    })
      .then(res => {
        console.log(res);
      })
      .then(() => this.props.initMovies())
      .catch(e => console.log(e));
    event.target.querySelector("#file").value = "";
  }

  render() {
    return (
      <div className="upload">
        <h4>Upload file: </h4>
        <form onSubmit={event => this.uploadFileHandler(event)}>
          <input id="file" type="file" name="text" accept=".txt" />
          <input type="submit" value="Upload file!" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initMovies: () => dispatch(actions.initMovies())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(UploadFile)
);
