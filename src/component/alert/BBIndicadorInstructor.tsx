import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB } from '../../models/enrolamiento'

interface IState{
    enrolamiento: IEnrolamientoBB[]
    status: boolean
    cantidad: number
}

interface IProps{
    enrolamientoBB: IEnrolamientoBB[]
}

export default class BBIndicadorInstructor extends Component <IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            enrolamiento: [],
            status: true,
            cantidad:0
        }
    }
    
    componentDidMount() {
        
        this.setState({
            cantidad: this.props.enrolamientoBB.length > 0 ? this.props.enrolamientoBB.length : 0
        })
    }

    componentDidUpdate(prevProps:IProps) {
        if(this.props.enrolamientoBB.length !== prevProps.enrolamientoBB.length)
            this.setState({
                cantidad: this.props.enrolamientoBB.length > 0 ? this.props.enrolamientoBB.length : 0
            })
    }

    render() {
        return (
            <Fragment>
                {
                (this.state.status)?
                <span>
                    {this.state.cantidad > 0 ?
                        <i className="fas fa-chalkboard-teacher text-success"></i>
                        :
                        <i className="fad fa-chalkboard-teacher text-danger"></i>}
                </span>
                :
                <i className="fas fa-yin-yang fa-spin "></i>
                }
            </Fragment>
        )
    }
}
