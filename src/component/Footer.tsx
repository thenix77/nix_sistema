import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <strong>
          Copyright © 2020-2021 {" - "}Nix {" - "}
          <a href="http://www.senati.edu.pe">Senati</a>.
        </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.0.5
        </div>
      </footer>
    );
  }
}
