import React, { Component } from 'react'

interface IProps{
    status:string
}

interface IState{
    status:string
}

export default class AlertYesNo extends Component<IProps,IState> {
    constructor(props:IProps){
        super(props)

        this.state ={
            status:'N'
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
                        <span className='text-success'>✓</span>   
                    :
                        <span className='text-danger'>✗</span>
                }
            </div>
        )
    }
}
