export interface IZonal {
    nrc: string
    zonal: string
    supervisor:string
    correo:string
}

export interface ISupervisores{

    name: string
    password: string
    display: string
    First: string
    zonal: string
    plus:string
}


export interface ICursoSupervisor{
    curso: string
    supervisor: string
    zonal: string
    correo:string
}