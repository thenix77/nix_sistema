import React, { Component, Fragment } from 'react'

import ApiJson from '../ApiJson.json'

import { ExcelRenderer } from 'react-excel-renderer'
import { IBBCursosMatriculados, IVMatricula } from '../models/matricula.sinfo'
import { AnalizarNrc } from '../lib/analisisListaCruzada'
import { ITutoria } from '../models/tutoria.sinfo'
import TablaComandoAlumno from './TablaComandoAlumno'


interface IProps { }
interface IState {
    active: boolean,
    ruta: string
    cols: []
    rows: []
    matriculaApex: IVMatricula[]
    listaMatriculados: IVMatricula[],
    tutoria: ITutoria[],
    BBCursosMatriculados : IBBCursosMatriculados[]
}


export default class ComandoCursos extends Component<IProps, IState> {

    private lista: any = []
    private listaMat: IVMatricula[] = []
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            active: false,
            ruta: '',
            cols: [],
            rows: [],
            matriculaApex: [],
            listaMatriculados: [],
            tutoria: [],
            BBCursosMatriculados: []
        }

        this.handleArchivo = this.handleArchivo.bind(this)
    }

    Activacion() {
         this.setState({
            active: true
        })
        
    }


    DesActivacion() {
        this.setState({
            active: false
        })
    }

    
    async Data(){
        await fetch(`${ApiJson.Api}/sinfo/matricula`,
                    {
                        method:'GET',
                        headers:{
                            'Content-Type':'Application/json',
                            'token':localStorage.getItem('token') || ''
                        }
                    })
                    .then((db)=> db.json())
                    .then((data)=>{
                        this.setState({
                            matriculaApex: data.data
                        })
                    })
        /*
        await  fetch(`${ApiJson.Api}/sinfo/tutoria`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'Application/json',
                        'token':localStorage.getItem('token') || ''
                    }
                })
                .then((db)=> db.json())
             .then((data) => {
                    this.setState({
                        tutoria: data.data
                    })
             })
*/
        await  fetch(`${ApiJson.Api}/BB/Enrolamiento/cursos`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'Application/json',
                        'token':localStorage.getItem('token') || ''
                    }
                })
                .then((db)=> db.json())
                .then((data) => {
                       this.setState({
                        BBCursosMatriculados: data.data
                    })
                })
        
    }

    async handleArchivo({ target }: React.ChangeEvent<HTMLInputElement | any>) {
        this.Activacion()

        this.setState({
            ruta:  target.files[0].name,
        })



        ExcelRenderer(target.files[0], (err: any, resp: any) => {
            if (err) {
                alert(err);
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows
                })
               
                for (let row of this.state.rows) {
                    this.lista.push(row[0])
                }

                if(this.lista[0].toLowerCase() === 'nrc') this.lista.shift() 
            }
        })

        await this.Data()

        this.setState({
            listaMatriculados: AnalizarNrc(this.state.matriculaApex, this.lista),
        })

        console.log(this.state.BBCursosMatriculados.filter(lst => lst.role === 'S'))
      
        this.DesActivacion()
    }


    render() {
        return (
            <Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="form-group">
                            <div>
                                <label htmlFor="exampleInputFile">Ingrese el Archivo Lista Cruzada</label>
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input  type="file"
                                                className="custom-file-input"
                                                accept='.xlsx'
                                                disabled={this.state.active}
                                                onChange={(e) => this.handleArchivo(e)}
                                                
                                        />
                                        <label className="custom-file-label" htmlFor="exampleInputFile">{this.state.ruta}</label>
                                    </div>
                                    <div className="input-group-append" >
                                        <span className="input-group-text" >
                                            {this.state.active ?
                                                <i className="fas fa-compact-disc fa-spin text-purple"></i>
                                                :
                                                <i className="fas fa-play-circle"></i>
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className='row justify-content-center'>
                    <div className="col-md-12">
                        <TablaComandoAlumno     Matriculados={this.state.listaMatriculados.filter(lst => lst.pago !== 'PaganteN')}
                                                BBMatriculados={this.state.BBCursosMatriculados.filter(lst => lst.role === 'S')}                    
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}
