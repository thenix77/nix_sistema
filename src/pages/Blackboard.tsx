import React, { Component, Fragment } from 'react'
import Retiros from '../component/blackboard/Retiros'

interface IProps { }
interface IState {
    activar: boolean
    titulo: string
    select: string
}


export default class Blackboard extends Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            activar: false,
            titulo: '',
            select:''
        }

        this.handleRetiros = this.handleRetiros.bind(this)
    }

    handleRetiros() {
        this.setState({
            titulo: 'Retiros',
            select: 'retiros'
        })
    }

    render() {
        return (
            <Fragment>
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    {/* DIRECT CHAT */}
                    <div className="card direct-chat direct-chat-warning">
                        <div className="card-header">
                            <h3 className="card-title">Blackboard </h3> 
                            <div className="card-tools">
                                Registros:
                                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                                    <i className="fas fa-comments" /></button>
                                {/*<button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                                </button>*/}
                            </div>
                        </div>
                        <div className="card-body" style={{margin:"10px 0px "}}>
                            <button className="btn btn-app" onClick={this.handleRetiros}>
                                <i className="fas fa-users"></i> Retiros
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-md-10">
                    <div className="card direct-chat direct-chat-warning">
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card-header">
                                    <h3 className="card-title">Blackboard { this.state.titulo}</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                    </button>
                                </div>
                            </div>
                            <div className="card-body" style={{ margin: "10px" }} >
                                <div style={{width:'100%'}}>
                                    {   (this.state.select ==='retiros')?
                                            <Retiros />          :
                                            <></>
                                    }
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>    
            </Fragment>
        )
    }
}
