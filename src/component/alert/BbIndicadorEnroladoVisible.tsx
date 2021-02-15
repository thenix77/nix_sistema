import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB } from '../../models/enrolamiento'

interface IState{
    status:         boolean
    visible:        string
}

interface IProps{
    enrolamientoBB: IEnrolamientoBB[]

}

export default class BbIndicadorEnroladoVisible extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            visible:'',
            status:true
        }
    }
    
    componentDidMount() {
        
        this.setState({
            visible: this.props.enrolamientoBB.length > 0 ? this.props.enrolamientoBB[0].usuariovisible :'N'
        })
        
    }

    componentDidUpdate(prevProps:IProps) {
        if(this.props.enrolamientoBB.length !== prevProps.enrolamientoBB.length)
            this.setState({
                visible: this.props.enrolamientoBB.length > 0 ? this.props.enrolamientoBB[0].usuariovisible :'N'
            })
        
    }

    render() {
        return (
            <Fragment>
                {
                    (this.state.status)?
                    <span>
                            {
                                (
                                    this.state.visible === 'Y') ?
                                        <i className="far fa-chalkboard-teacher text-success"></i>
                                    :
                                        <i className="fad fa-chalkboard-teacher text-danger"></i>
                            }
                    </span>
                :
                    <i className="fas fa-yin-yang fa-spin "></i>
                }
            </Fragment>
        )
    }
}
