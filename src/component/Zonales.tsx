import React, { Component } from 'react'
import ApiJson from '../ApiJson.json'
import { IZonales } from '../models/public/zonales.model'

interface IProps {
    zonal:Function
}
interface IState {
    zonales: IZonales[],
    zonal: string
}

export default class Zonales extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            zonales: [],
            zonal:'0'
        }

        this.cmbSeleccion = this.cmbSeleccion.bind(this)
    }
    
    async componentDidMount() {
         await  fetch(`${ApiJson.Utda}/public/zonales/zonal`,
               {
                   method:'GET',
                   headers:{
                       'Content-Type':'Application/json',
                       'token':localStorage.getItem('token') || ''
                   }
               })
               .then((db)=> db.json())
               .then((data)=>{
                   this.setState({
                      zonales: data.data
                   })
               })

    }

    cmbSeleccion({target }:React.ChangeEvent<HTMLSelectElement>) {
        
        this.props.zonal(parseInt(target.value))
        this.setState({
            zonal:target.value
        })
    }

    render() {

        const cmbZonal = this.state.zonales.map((zonal: IZonales, i: number) => {
            return (
                <option value={zonal.pk1.toString()} key={'zonal-'+i}>{zonal.zonal}</option>
            )
        })

        return (
            <select className="form-control form-control-sm"
                onChange={this.cmbSeleccion}
                value={this.state.zonal}
            >
                <option value='0'>--- ZONALES ---</option>
                {cmbZonal}
            </select>
        )
    }
}
