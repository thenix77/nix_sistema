import React, { Component } from 'react'
import { ICarreras } from '../models/apex/carreras.model'

interface Props {
    data: ICarreras[]
    carrera:Function
}
interface State {
    carreras: ICarreras[]
    carrera:number
}

export default class Carreras extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            carreras: [],
            carrera:0
        }

        this.cmbSeleccion = this.cmbSeleccion.bind(this)
    }

       cmbSeleccion({target }:React.ChangeEvent<HTMLSelectElement>) {
        
        this.props.carrera(target.value)
        this.setState({
            carrera:parseInt(target.value)
        })
    }

    render() {

        const combo = this.props.data.map((carrera: ICarreras, i: number) => {
            return (
                <option key={'carrera-' + i} value={carrera.pk1}>{carrera.carrera}</option>
            )
        })


        return (
            <select className="form-control form-control-sm"
                onChange={this.cmbSeleccion}
                value={this.state.carrera}    
            >
                <option value="0">---CARRERA---</option>
                { combo}
            </select>
        )
    }
}
