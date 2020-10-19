import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Content from '../component/Content'

interface IProps extends RouteComponentProps{

}

export default class Home extends Component<IProps,{}> {
    render() {
        return (
            <div>
                <Content  {...this.props}/>
            </div>
        )
    }
}
