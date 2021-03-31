import React, { Component, Fragment } from 'react'

import Pagination from '../Pagination'
import {CSVLink } from 'react-csv'
import { IScript } from '../../models/script'


interface IComponente extends IScript {
    pk1:number
    course_id  :string
    categoria_nombre  :string
    componente  :string
    intentos: string
}

interface IProps  {
    componentes: IComponente[],
    registros: number
}

interface IState{
    componentes: IComponente[],
    tempComponentes: IComponente[]
    pagina:number
}

export default class Intentos extends Component<IProps, IState> {

    private pagina:number = 1
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            componentes: [],
            tempComponentes: this.props.componentes.filter((c: IComponente) => c.pk1 <= this.props.registros),
            pagina:1
        }

        this.paginaActual = this.paginaActual.bind(this)
    }

    componentDidMount() {
        this.setState({
            componentes:this.props.componentes
        })
    }

    paginaActual(pagina: string) {
        
        this.pagina = parseInt(pagina)
        
        const tempComponentes = this.state.componentes
                .filter((c: IComponente) =>
                    c.pk1 >= ((this.pagina - 1) * this.props.registros ) + 1
                    &&
                    c.pk1 <= ((this.pagina - 1) * this.props.registros ) + this.props.registros
        )

        this.setState({
            tempComponentes: Object.assign([], tempComponentes),
            pagina:this.pagina
        })

       
    }

    render() {

        const tbody = this.state.tempComponentes.map((c: IComponente, i: number) => {
            return (
                <tr key={'tbl-int-'+i}>
                    <td align='center' width='5%'>{ c.pk1 }</td>
                    <td align='center' width='20%'>{ c.course_id }</td>
                    <td >{ c.script}</td>
                </tr>
            )
        })

        return (
            <Fragment>
                <Pagination paginas={this.state.componentes.length}
                            registros={this.props.registros}
                            paginaActual={ this.paginaActual} />
                 
                <div className="row">
                    <div className="col-1">
                        <CSVLink    data={this.state.componentes}
                                    className='btn btn-app'
                                    target='_blank'
                                    separator={';'}
                                    filename={"Rpt_intentos.csv"}
                        >
                            <i className="fas fa-file-signature text-success"></i>Reporte
                        </CSVLink>
                    </div>
                    <div className="col-1">
                        <CSVLink    data={this.state.tempComponentes}
                                    className='btn btn-app'
                                    target='_blank'
                                    separator={';'}
                                    filename={"intento-"+this.state.pagina+".csv"}
                        >
                            <i className="fas fa-file-csv text-success"></i> Pagina - { this.state.pagina}
                        </CSVLink>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-4" style={{ textAlign: 'right' }}>
                        <span> Desde: 
                            <b>{(this.pagina - 1) * this.props.registros + 1}</b>
                            &nbsp;&nbsp;hasta: 
                            <b>{((this.pagina - 1) * this.props.registros) + this.props.registros}</b>
                            &nbsp;&nbsp;Registros: <b>{this.state.componentes.length}</b> 
                        </span>    
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered table-striped table-sm" style={{fontSize:'small'}} >
                            <thead>
                                <tr>
                                    <td align='center'>item</td>
                                    <td align='center'>courseId</td>
                                    <td align='center'>script</td>
                                </tr>
                            </thead>
                            <tbody>
                                { tbody }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
  
    
}
