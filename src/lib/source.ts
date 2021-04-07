import { ICarreras } from "../models/apex/carreras.model"
import { IProgramas } from "../models/apex/programas.model"
import { ICampus } from "../models/public/zonales.model"

export function idAlumno(idalumno: string) {
        
        let temp = ''

        idalumno = idalumno.replace(' ', '')
    
        
        const cant = idalumno.length
        const cantidadCeros = 9 - cant

        for (var i = 0; i < cantidadCeros ; i++) {
            temp += '0'
        }

       return temp + idalumno
}

export function parseIdAlumno(idalumnos:string):string{
    
    let values:string[] = []
    let newIdAlumnos = idalumnos.split(',')
    
    var setvs = (cadena:string[]) =>  cadena.map((c) => values.push(idAlumno(c)))
    setvs(newIdAlumnos)
    
    return values.join()
}

export function parseNrc(nrc:string):string{
    
    let values:string[] = []
    let newNrc = nrc.split(',')
    
    var setvs = (cadena:string[]) =>  cadena.map((c) => values.push(c.trim()))
    setvs(newNrc)
    
    return values.join()
}


export function removeDuplicadosCampus(data: ICampus[]) {
    
    let hash: any = {};
    
    data = data.filter((o:ICampus) => hash[o.pk1] ? false : hash[o.pk1] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicadosProgramas(data: IProgramas[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IProgramas) => hash[o.pk1] ? false : hash[o.pk1] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicadosCarreras(data: ICarreras[]) {
    
    let hash: any = {};
    
    data = data.filter((o:ICarreras) => hash[o.pk1] ? false : hash[o.pk1] = true);//hash[o.cursoid]

    return data
}
