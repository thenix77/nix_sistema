import React, { Component } from "react";

import { IVMatricula } from "../models/matricula.sinfo";

interface IProps {
  curso: IVMatricula;
}

interface IState {}

export default class TablaClonar extends Component<IProps, IState> {
  render() {
    return (
      <>
        {
          (this.props.curso.calificable === 'N') ?
            <div className="alert alert-danger text-center" role='alert'>
              <label>NO CALIFICABLE</label>
            </div>
            :
            <></>
        }
        
        <table
          className="table table-bordered table-striped"
          style={{ fontSize: "x-small" }}
          width="100%"
        >
          <thead>
            <tr>
              <th align="center">N</th>
              <th align="center">Curso/Perido</th>
              <th align="center">Patron</th>
              <th align="center">Script - clonar - periodo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center" width="5%">
                1
              </td>
              <td align="center" width="17%">
                {this.props.curso.cursoid}
              </td>
              <td align="left" width="18%">
                {this.props.curso.patron}
              </td>
              <td align="left" width="60%">
                CLONAR_POST-Curso $token $URL_sitio courseId:{this.props.curso.patron} {this.props.curso.cursoid}
              </td>
            </tr>
            <tr>
              <td align="center" width="5%">
                2
              </td>
              <td align="center" width="17%">
                202020
              </td>
              <td align="left" width="18%">
                {this.props.curso.cursoid}
              </td>
              <td align="left" width="60%">
                CURSO_PATCH-Periodo $token $URL_sitio courseId:{this.props.curso.cursoid} externalId:202020
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
