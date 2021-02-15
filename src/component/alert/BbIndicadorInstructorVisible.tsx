import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB } from '../../models/enrolamiento'

interface IState{
    enrolamiento: IEnrolamientoBB[]
    status: boolean
    visible: string
}

interface IProps{
    enrolamientoBB: IEnrolamientoBB[]
}

export default class BbIndicadorInstructorVisible extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            enrolamiento: [],
            status: true,
            visible:'N'
        }
    }
    
    componentDidMount() {
        
        this.setState({
            visible: this.props.enrolamientoBB.length > 0 ? this.props.enrolamientoBB[0].usuariovisible : 'N'
        })
    }

    componentDidUpdate(prevProps:IProps) {
        if(this.props.enrolamientoBB.length !== prevProps.enrolamientoBB.length)
            this.setState({
                visible: this.props.enrolamientoBB.length > 0 ? this.props.enrolamientoBB[0].usuariovisible : 'N'
            })
    }

    render() {
        return (
            <Fragment>
                {
                (this.state.status)?
                <span>
                    {this.state.visible === 'Y' ?
                        <i className="fas fa-users-class text-success"></i>
                        :
                        <i className="fas fa-users-class text-danger"></i>}
                </span>
                :
                <i className="fas fa-yin-yang fa-spin "></i>
                }
            </Fragment>
        )
    }
}
