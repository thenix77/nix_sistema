import React, { Component } from 'react'

interface IProps{
    paginas: number
    registros: number
    paginaActual:Function
}

interface IState{
    paginas: number
    inicio: number
    select:string
}

export default class Pagination extends Component<IProps, IState> {
    
    constructor(props:IProps) {
        super(props)

        this.state = {
            paginas: Math.trunc(this.props.paginas /1000) + 1,
            inicio: 0,
            select:'1'
        }

        this.pagination = this.pagination.bind(this)
    }

    componentDidMount() {
        this.setState({
            paginas:Math.trunc(this.props.paginas /1000) + 1
        })
    }

    pagination(event:any) {
        const { id } = event.target
        this.setState({
            select:id
        })        
        this.props.paginaActual(id)

    }

  
    render() {
        const items = []

        for (let i: number = 1; i <= Math.trunc(this.props.paginas /this.props.registros) + 1; i++) {
            items.push(
                <li className={this.state.select === i.toString() ? 'page-item active': 'page-item'}
                    key={'pg-' + i}
                    onClick={this.pagination}
                >
                    <div className="page-link" id={i.toString()}  >{i} </div>
                </li>)
        }

        return (

            <div className="row justify-content-md-center">
                <div className="col-10">
                    <nav aria-label="Page navigation ">
                        <ul className="pagination pagination-sm">
                            <li className="page-item" >
                                <div className="page-link" >
                                    <i className="fas fa-angle-double-left"></i>
                                </div>
                            </li>
                            {items}
                            <li className="page-item" >
                                <div className="page-link" >
                                    <i className="fas fa-angle-double-right"></i>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
