import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB } from '../../models/enrolamiento'

interface IState{
    cantidad: number
    status: boolean
    enrolamientoBB: IEnrolamientoBB[]
}

interface IProps{
    enrolamientoBB: IEnrolamientoBB[]
    
}

export default class BbIndicadorEnrolado extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            cantidad:0,
            status: true,
            enrolamientoBB:[]
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
                    {this.state.cantidad >0 ?
                        <i className="fas fa-user-check text-success"></i>
                        :
                        <i className="fas fa-user-times text-danger"></i>}
                </span>
                :
                <i className="fas fa-yin-yang fa-spin "></i>
                }
            </Fragment>
        )
    }
}
