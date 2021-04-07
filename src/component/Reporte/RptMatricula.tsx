import React, { Component, Fragment } from 'react'
import Campus from '../Campus'
import Zonales from '../Zonales'
import ApiJson from '../../ApiJson.json'
import { ICampus } from '../../models/public/zonales.model'
import Programas from '../Programas'
import { IRptTutoria } from '../../models/reports/tutoria.model'
import { ICarreras } from '../../models/apex/carreras.model'
import Carreras from '../Carreras'
import Chart from 'react-google-charts'
import { IProgramas } from '../../models/apex/programas.model'
import {removeDuplicadosCampus, removeDuplicadosCarreras, removeDuplicadosProgramas} from '../../lib/source'

interface IProps {
//    data: IRptTutoria[]
    periodo:string
}

interface IState{
    activar: boolean
    select: string
    tituloY:string
    rptTutorias: IRptTutoria[]
    carreras:ICarreras[]
    zonal: number
    campus: ICampus[]
    campu: number
    programas: IProgramas[]
    programa:number
    active:boolean
    grafica: any
    cantidad: number
    titulo: string
    retirado: string
    habil:string

}
export default class RptMatricula extends Component<IProps, IState> {

        
    constructor(props: IProps) {
        super(props)

 
        this.state = {
            activar: false,
            select: '',
            rptTutorias: [],
            carreras:[],
            campus: [],
            programas: [],
            zonal: 0,
            campu:0,
            programa:0,
            active: false,
            grafica: [],
            cantidad: 0,
            titulo: '',
            tituloY: '',
            retirado: '',
            habil:''
        }

        this.handleZonal = this.handleZonal.bind(this)
        this.handleCampus = this.handleCampus.bind(this)
        this.handlePrograma = this.handlePrograma.bind(this)
    }

    async consultaRptTutoria(zonal: string) {
        
        await  fetch(`${ApiJson.Utda}/report/tutorias/${this.props.periodo}/zonal/${zonal}`,
               {
                   method:'GET',
                   headers:{
                       'Content-Type':'Application/json',
                       'token':localStorage.getItem('token') || ''
                   }
               })
                .then((db)=> db.json())
                .then((data) => {
                  
                   this.setState({
                      rptTutorias: data.data
                   })
               })
        
    }

    async consultaPublicCampus(zonal: string) {
        
        let temp:ICampus[] = []

        this.state.rptTutorias.map((z: IRptTutoria) => 
            temp.push({pk1: z.campusid, campus: z.campus ,zonal: z.zonal, zonalid:z.zonalid})
        )
        
        this.setState({
            campus: removeDuplicadosCampus(temp)
        })

    }


    async consultaApexProgramas(campus:string) {
        
        let temp: IProgramas[] = []
        
        this.state.rptTutorias
            .filter((t: IRptTutoria) => t.campusid === parseInt(campus))
            .map((t: IRptTutoria, i: number) => 
                temp.push({ pk1: t.programaid, programa: t.programa})
            )
        
        this.setState({
            programas: removeDuplicadosProgramas(temp)
        })
    }


    async consultaApexCarreras(programa: string) {
        let temp: ICarreras[] = []
        
        this.state.rptTutorias
            .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
            .filter((t: IRptTutoria) => t.campusid === this.state.campu)
            .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
            .map((t: IRptTutoria, i: number) => 
                temp.push({ pk1: t.carreraid, carrera: t.carrera,cod_carrera:t.cod_carrera})
        )
        
        this.setState({
            carreras:removeDuplicadosCarreras(temp)
        })
    }



    async handleCarrera(carrera: number) {
        
    }


    async handleZonal(zonal: string) {
        this.setState({
            activar: true,
            select: '',
            campu: 0,
            programa: 0,
            programas: [],
            campus: []
        })
        
        await this.consultaRptTutoria(zonal)
        await this.consultaPublicCampus(zonal)
        

        const grafica: any = [['Campus', 'Hábil',{ role: 'annotation' }, 'Retirados', { role: 'annotation' }]]
        
        this.state.campus.map((campus: ICampus, i: number) =>
            grafica.push([campus.campus,
            this.state.rptTutorias
                .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                .filter((t: IRptTutoria) => t.condicion_acad === 'Hábil')
                .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                ,
                 this.state.rptTutorias
                .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                .filter((t: IRptTutoria) => t.condicion_acad === 'Hábil')
                .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
            ,
            this.state.rptTutorias
                .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                .filter((t: IRptTutoria) => t.condicion_acad === 'Retirado')
                .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                ,
                this.state.rptTutorias
                    .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                ,
            ])
        )

        this.setState({
            grafica: Object.assign([], grafica),
            titulo: 'Total Inscritos: ' +
                this.state.rptTutorias
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
            +' Habilitados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria) => t.condicion_acad === 'Hábil')
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
            +' Retirados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria) => t.condicion_acad === 'Retirado')
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
            ,
            tituloY:'Campus',
            select: 'grafica',
            activar: false,
            zonal: parseInt(zonal),
           
        })
   }

 

    async handleCampus(campus: string) {

        this.setState({
            select: '',
            activar: true,
            programa: 0
        })

        await this.consultaApexProgramas(campus)

        let grafica: any = []

        if (parseInt(campus) === 0) {

            grafica.push(['Campus','Hábil',{ role: 'annotation' },'Retirados',{ role: 'annotation' }])
            this.state.campus.map((campus: ICampus, i: number) => 
            grafica.push([campus.campus,
                this.state.rptTutorias
                    .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                ,
                this.state.rptTutorias
                    .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                ,
                this.state.rptTutorias
                    .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                ,
                this.state.rptTutorias
                    .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === campus.pk1)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                    .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                
            ])
            )

            this.setState({
                titulo: 'Total Inscritos: ' +
                this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Habilitados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Retirados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
            
            })
        }
        else {
            grafica.push(['Programa','Hábil',{ role: 'annotation' },'Retirados',{ role: 'annotation' }])
            this.state.programas.map((progr: IProgramas, i: number) =>
                grafica.push([
                    progr.programa,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === parseInt(campus))
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === parseInt(campus))
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === parseInt(campus))
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === parseInt(campus))
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                        
                ])
            )

            this.setState({
                titulo: 'Total Inscritos: ' +
                this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t:IRptTutoria)=> t.campusid === parseInt(campus))
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Habilitados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === parseInt(campus))
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Retirados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === parseInt(campus))
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
            
            })
        }

        
    
        this.setState({
            grafica: Object.assign([], grafica),
            tituloY:'PROGRAMAS',
            select: 'grafica',
            activar: false,
            campu:  parseInt(campus)
        })

    }

    
    async handlePrograma(programa: string) {
        this.setState({
            select: '',
            activar:true,
            programa: parseInt(programa)
        })

        await this.consultaApexCarreras(programa)

        let grafica: any = []

        if (parseInt(programa) === 0) {

            grafica.push(['Programa', 'Hábil',{ role: 'annotation' }, 'Retirados',{ role: 'annotation' }])
            this.state.programas.map((progr: IProgramas, i: number) =>
                grafica.push([
                    progr.programa,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Hábil')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Hábil')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Retirado')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === progr.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Retirado')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                     
                ])
            )

            this.setState({
                titulo: 'Total Inscritos: ' +
                this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Habilitados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Retirados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
            
            })
        }
        else {
 
            grafica.push(['Carreras', 'Hábil',{ role: 'annotation' }, 'Retirados',{ role: 'annotation' }])

            this.state.carreras.map((carrera: ICarreras, i: number) =>
                grafica.push([
                    carrera.carrera,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
                        .filter((t: IRptTutoria) => t.carreraid === carrera.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Hábil')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
                        .filter((t: IRptTutoria) => t.carreraid === carrera.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Hábil')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
                        .filter((t: IRptTutoria) => t.carreraid === carrera.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Retirado')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                    ,
                    this.state.rptTutorias
                        .filter((t: IRptTutoria) => t.zonalid === this.state.zonal)
                        .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                        .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
                        .filter((t: IRptTutoria) => t.carreraid === carrera.pk1)
                        .filter((t: IRptTutoria) => t.condicion_acad === 'Retirado')
                        .reduce((acumulador: number, rptTutoria: IRptTutoria) => acumulador + rptTutoria.cantidad, 0)
                   
                ]),
            )

            this.setState({
                titulo: 'Total Inscritos: ' +
                this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                    .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Habilitados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                    .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Hábil')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
                +' Retirados: ' + this.state.rptTutorias
                    .filter((t:IRptTutoria)=> t.zonalid === this.state.zonal)
                    .filter((t: IRptTutoria) => t.campusid === this.state.campu)
                    .filter((t: IRptTutoria) => t.programaid === parseInt(programa))
                    .filter((t:IRptTutoria)=> t.condicion_acad === 'Retirado')
                    .reduce((acumulador:number,rptTutoria:IRptTutoria)=> acumulador + rptTutoria.cantidad, 0)
            
            })
        }

        this.setState({
            grafica: Object.assign([], grafica),
            tituloY:'Carreras',
            select: 'grafica',
            activar: false
        })


    }


    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <Zonales zonal={this.handleZonal}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <Campus data={this.state.campus} campus={this.handleCampus}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <Programas data={this.state.programas}
                                                programa={this.handlePrograma}
                                                value={this.state.programa.toString()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        {
                                        this.state.activar ?
                                            <div className='reload' >
                                                <img src={'/dist/img/reload.gif'}  alt=""/>
                                            </div>
                                        :
                                            ''
                        }
                        
                        {
                            this.state.rptTutorias.length > 0 && this.state.select === 'grafica' ?
                            <Chart
                                    width={'100%'}
                                    height={'500px'}
                                    chartType="BarChart"
                                    loader={<div>Loading Chart...</div>}
                                    data={ this.state.grafica}
                                    options={{
                                            title: this.state.titulo,
                                            chartArea: { width: '50%', height:'50%' },
                                            isStacked: true,
                                            hAxis: {
                                            title: 'Total Aprendizes',
                                            minValue: 0,
                                            
                                            },
                                            vAxis: {
                                                title:this.state.tituloY,
                                            },
                                            legend: {position: 'top', maxLines: 1},
                                            //bar: {groupWidth: "auto"},
                                            
                                    }}
                                    controls={[
                                        {
                                            controlType: 'StringFilter',
                                            options: {
                                                filterColumnIndex: 0,
                                                matchType: 'any',
                                                ui: {
                                                    label:'Buscar: '
                                                }
                                            }
                                        }
                                    ]}
                                    
                                />
                            :
                            ''    
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}