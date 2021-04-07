import React, { Component } from 'react'
import { ICampus } from '../models/public/zonales.model'

interface IProps {
    data: ICampus[]
    campus:Function
}
interface IState {
    data: ICampus[]
    campus: string
}

export default class Campus extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            data: [],
            campus: '0'
        }

        this.cmbSeleccion = this.cmbSeleccion.bind(this)
    }

   cmbSeleccion({target }:React.ChangeEvent<HTMLSelectElement>) {
        
        this.props.campus(target.value)
        this.setState({
            campus:target.value
        })
    }
    
    render() {
        const cmbCampus = this.props.data.map((campus: ICampus, i: number) => {
            return (
                <option value={campus.pk1.toString()} key={'campus-'+i}> {campus.campus}</option>
            )
        })

        return (
            <select className="form-control form-control-sm"
                onChange={this.cmbSeleccion}
                value={this.state.campus}    
            >
                <option value="0">---CAMPUS---</option>
                { cmbCampus}
            </select>
        )
    }
}
