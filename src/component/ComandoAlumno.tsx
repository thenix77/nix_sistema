import React, { Component } from 'react'
import { ValidarEmail, ValidarNumero, ValidarTexto } from '../lib/validation'
import "react-switchable/dist/main.css";

interface IProps {}

interface IState {
    idsinfo: string
    correo:string
    apellido: string
    nombre: string
    validCorreo: boolean
    validIdSinfo: boolean
    validApellido: boolean
    validNombre: boolean
    accesoPlataforma: string
   
}

export default class ComandoAlumno extends Component<IProps,IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            idsinfo: '',
            correo: '',
            apellido: '',
            nombre: '',
            validCorreo: false,
            validIdSinfo: false,
            validApellido: false,
            validNombre: false,
            accesoPlataforma: 'Y',
           
        }

        this.handleIdSinfo = this.handleIdSinfo.bind(this)
        this.handleApellido = this.handleApellido.bind(this)
        this.handleNombre = this.handleNombre.bind(this)
        this.handleCorreo = this.handleCorreo.bind(this)
        this.handleAccesoBB = this.handleAccesoBB.bind(this)
    }

    handleIdSinfo({ target }: React.ChangeEvent<HTMLInputElement>) {

        this.setState({
            idsinfo: target.value,
            validIdSinfo: ValidarNumero(target.value)
        })
    }

    handleApellido({target}:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            apellido: target.value,
            validApellido:ValidarTexto(target.value)
            
        })
    }

    handleNombre({target}:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            nombre: target.value,
            validNombre:ValidarTexto(target.value)
        })
    }

    handleCorreo({ target }: React.ChangeEvent<HTMLInputElement>) {
       
        this.setState({
            correo: target.value,
            validCorreo: ValidarEmail(target.value)
        })
    }

    handleAccesoBB(index:string) {
        this.setState({
            accesoPlataforma: index
        })
    }
    

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row ">{/**justify-content-md-center */}
                        <div className="col-md-3">
                            <div className="card card-success">
                                <div className="card-header">
                                    <h3 className='card-title'>
                                        <i className="fas fa-user"></i>
                                    </h3>
                                </div>
                                <div className="card-body" style={{fontSize:'x-small'}}>
                                    <div className="row justify-content-md-center">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">ID Sinfo</label>
                                                <input  type="text"
                                                        className={this.state.validIdSinfo ? "form-control form-control-sm is-valid" :
                                                                                             "form-control form-control-sm is-invalid"}
                                                        id='tipo'
                                                        name='tipo'
                                                        maxLength={9}
                                                        placeholder="ID Sinfo"
                                                        onChange={this.handleIdSinfo}
                                                        value = {this.state.idsinfo}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-md-center">
                                        <div className="col-md-10">
                                            <div className="form-group form-group-sm">
                                                <label htmlFor="apenombre">Apellidos</label>
                                                <input  type="text"
                                                        className={this.state.validApellido ? "form-control form-control-sm is-valid" :
                                                                                             "form-control form-control-sm is-invalid"}
                                                        id="apellido"
                                                        placeholder="Apellidos"
                                                        onChange={this.handleApellido}
                                                        value = {this.state.apellido}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-md-center">
                                        <div className="col-md-10">
                                            <div className="form-group form-group-sm">
                                                <label htmlFor="apenombre">Nombres</label>
                                                <input  type="text"
                                                    className={this.state.validNombre ? "form-control form-control-sm is-valid" :
                                                                                        "form-control form-control-sm is-invalid"}
                                                    id="nombre"
                                                    placeholder="Nombres"
                                                    onChange={this.handleNombre}
                                                    value = {this.state.nombre}
                                                 />
                                            </div>    
                                        </div>
                                    </div>
                                    <div className="row justify-content-md-center">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input  type="text"
                                                        className={this.state.validCorreo ? 'form-control form-control-sm  is-valid' :
                                                                                            'form-control form-control-sm  is-invalid'}
                                                        id="email"
                                                        placeholder="Correo"
                                                        onChange={this.handleCorreo}
                                                        value={this.state.correo}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>{/**fin body */}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <table className='table table-bordered table-striped ' style={{ fontSize: 'x-small' }} width='100%' >
                                <tr>
                                    <td width='10%'>Crear Usuario</td>
                                    <td width='90%'>
                                        {this.state.validApellido && this.state.validNombre && this.state.validIdSinfo && this.state.validCorreo ?
                                        <>
                                            USUARIO_POST-Crear $token $URL_sitio {this.state.idsinfo}@senati.pe '{this.state.apellido.toUpperCase()}' '{this.state.nombre.toUpperCase()}' '{this.state.idsinfo.padStart(9, "000000000")}' '987654321' '{this.state.correo.toLowerCase()}'
                                        </> :
                                        <></>
                                    }
                                    </td>
                                </tr>
                                 <tr>
                                    <td width='10%'>Crear Instructor</td>
                                    <td width='90%'>
                                        {this.state.validApellido && this.state.validNombre && this.state.validIdSinfo && this.state.validCorreo ?
                                        <>
                                            USUARIO_POST-Crear $token $URL_sitio {this.state.idsinfo} '{this.state.apellido.toUpperCase()}' '{this.state.nombre.toUpperCase()}' '{this.state.idsinfo.padStart(9, "000000000")}' '987654321' '{this.state.correo.toLowerCase()}'
                                        </> :
                                        <></>
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/*<Sw
                                                name="Activar Plataforma"
                                                onItemChanged={(index) => {this.handleAccesoBB(index)}}
                                            >
                                                <Item default value="Y">Activo</Item>
                                                <Item value="N">Desactivado</Item>
                                        </Sw>*/}
                                    </td>
                                    <td width='90%'>
                                        {this.state.validIdSinfo ? 
                                            <>
                                                USUARIO_PATCH-VisibleYN $token $URL_sitio externalId:{this.state.idsinfo.padStart(9, "000000000")} {this.state.accesoPlataforma}
                                            </> :
                                            <></>
                                        }
                                        
                                    </td>
                                </tr>
                            </table>
                         </div>
                    </div>
                </div>
            </section>
        )
    }
}
