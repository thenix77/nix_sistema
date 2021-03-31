import React, { Component } from 'react'

interface IProps{
    status:string
}

interface IState{
    status:string
}
export default class AlertYesX extends Component <IProps,IState> {
    constructor(props:IProps){
        super(props)

        this.state ={
            status:'X'
        }
    }
    
    componentDidMount(){
        this.setState({
            status: this.props.status
        })
    }


    render() {
        return (
            <div>
                {
                    this.state.status === 'Y'?
                        <span className='text-danger'>✓</span>   
                    :
                        ''
                }
            </div>
        )
    }
}