import React, { ChangeEvent, Component, Fragment } from 'react'
import ApiJson from '../ApiJson.json'

import { ExcelRenderer } from 'react-excel-renderer'

import { Analizar } from '../lib/analisisListaCruzada'

import { ILstMasiva } from '../models/listacruzada.sinfo'
import { IVMatricula } from '../models/matricula.sinfo'
import TablaScript from './TablaScript'
import TableScriptClonar from './TableScriptClonar'
//import TableCursos from './TablaCursos'
import TablaScriptInstructor from './TablaScriptInstructor'
import { IZonal } from '../models/zonal.sinfo'




interface IProps { }
interface IState  { 
    ruta: string
    active: boolean
    cols:any
    rows:any
    file: any
    matriculaApex: IVMatricula[]
    zonal: IZonal[]
    lista:[]
}


export default class ComandoListaCruzada extends Component<IProps, IState> {

    private listaCruzada: ILstMasiva[] = []
    private lista:any =  []
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            active:    false,
            file:       null,
            ruta:         '',
            cols:       null,
            rows:       null,
            matriculaApex: [],
            zonal:         [],
            lista:         []
        }
     
        this.handleArchivo = this.handleArchivo.bind(this)
       // this.handleProcesar = this.handleProcesar.bind(this)
    }

    async Data() {
        await  fetch(`${ApiJson.Api}/sinfo/matricula`,
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
        
        await  fetch(`${ApiJson.Api}/sinfo/zonal`,
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
                        zonal: data.data
                    })
             })
    }

    async handleArchivo({ target }: React.ChangeEvent<HTMLInputElement | any>) {
        this.Activacion()

        this.setState({
            ruta:  target.files[0].name,
        })

        if (!target.files.length) return

        ExcelRenderer(target.files[0], (err: any, resp: any) => {
            if (err) {
                alert(err);
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows
                })
                /*
                        this.state.rows.map((row:any, i:number) => {
                            if (i !== 0)
                                this.listaCruzada.push({ lc: row[0], nrc: row[1].toString(), tipo: row[2], fecha: row[3].toString() })
                            })    
                           }
                        })
                
                */
                for (let i = 1; i < this.state.rows.length; i++) {
                    this.listaCruzada.push({
                        lc:     this.state.rows[i][0],
                        nrc:    this.state.rows[i][1].toString(),
                        tipo:   this.state.rows[i][2],
                        fecha:  this.state.rows[i][3].toString()
                    })
                }
            }
        })
     
        await this.Data()

        this.lista = Analizar(this.state.matriculaApex, this.listaCruzada)

        this.DesActivacion()
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

    render() {
        let cont: number = 0

        const htmlBody = this.lista.map((lst: IVMatricula, i: number) => {
            
            return (
                <>
                    <TablaScript Lista={lst}  />
                </>    

            )
        })
        

    /*    
        const htmlBodyClonar = this.lista.map((lst: any, i: number) => {
            cont+= this.lista.l
            return (
                <>
                    <TableScriptClonar Lista={lst} key={cont} />
                </>    

            )
        })

        
        const htmlBodyZonal = this.lista.map((lst: any, i: number) => {
            cont+=i
            return (
                <>
                    <TablaScriptZonal Lista={lst} key={cont} Zonal={this.state.zonal}/>
                </>    

            )
        })
       

        const htmlBodyInstructor = this.lista.map((lst: any, i: number) => {
            cont+=50
            return (
                <>
                    <TablaScriptInstructor Lista={lst} key={cont} />
                </>    

            )
        })
 */

       //cont = (cont++) * 50 //fa-rotate-270
       
     
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
                        <table className='table table-bordered table-striped' width='100%' style={{fontSize:'x-small'}}>
                            <thead>
                                <tr>
                                    <td width='20%' align='center'>N </td>
                                    <td width='20%' align='center'>Curso</td>
                                    <td width='60%' align='center'>Script - Clonar - Curso</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/*htmlBodyClonar*/}
                            </tbody>
                         </table>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className="col-md-12">
                        <table className='table table-bordered table-striped' width='100%' style={{fontSize:'x-small'}}>
                            <thead>
                                <tr>
                                    <td width='20%' align='center'>N </td>
                                    <td width='20%' align='center'>Curso</td>
                                    <td width='60%' align='center'>Script - enrolamiento - alumno</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/*htmlBodyInstructor}
                                {/*htmlbobyZonal*/}
                                {htmlBody}
                            </tbody>
                        </table>
                    </div>
                </div>
        </Fragment>    
        )
    }
}
