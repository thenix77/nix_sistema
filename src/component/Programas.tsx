import React, { Component } from 'react'
import { IProgramas } from '../models/apex/programas.model'

interface Props {
    programa: Function
    data: IProgramas[]
    value:string
}
interface State {
    programa: string
   
}

export default class Programas extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            programa: '0',
        }

        this.cmbSeleccion = this.cmbSeleccion.bind(this)

    }

    componentDidUpdate(newProps: Props) {
        if (newProps !== this.props) {
            this.setState({
                programa:newProps.value
            })
        }
    }

    cmbSeleccion({target }:React.ChangeEvent<HTMLSelectElement>) {
        
        this.props.programa(parseInt(target.value))
        this.setState({
            programa:target.value
        })
    }

    render() {

        const combo = this.props.data.map((programa: IProgramas, i: number) => {
            return (
                <option key={'programa-'+i} value={programa.pk1.toString()}>{programa.programa}</option>
            )
        })

        return (
            <select className="form-control form-control-sm"
                onChange={this.cmbSeleccion}
                value={this.state.programa}
            >
                <option value='0'>---PROGRAMAS---</option>
                {combo}
            </select>
        )
    }
}
