import React, { Component, Fragment } from 'react'
import { IBBCursos } from '../../models/bbCursos'

interface IState{
    cantidad: number
    status: boolean

}

interface IProps{
    cursos:IBBCursos[]
}

export default class BbIndicadorCursoCreado extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            cantidad: 0,
            status:true
        }
    }
    
    componentDidMount() {
        
        this.setState({
            cantidad: this.props.cursos.length > 0 ? this.props.cursos.length : 0
        })
    }

    componentDidUpdate(prevProps:IProps) {
        if(this.props.cursos.length !== prevProps.cursos.length)
            this.setState({
                cantidad: this.props.cursos.length > 0 ? this.props.cursos.length : 0
            })
    }
    

    render() {
        return (
            <Fragment>
                {
                (this.state.status)?
                <span>
                    {this.state.cantidad > 0 ?
                        <i className="fas fa-book text-success"></i> 
                        :
                        <i className="fas fa-book-dead text-danger"></i>}
                </span>
                :
                <i className="fas fa-yin-yang fa-spin "></i>
                }
            </Fragment>
        )
    }
}