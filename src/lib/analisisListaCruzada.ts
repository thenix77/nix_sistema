import { ILstMasiva } from '../models/listacruzada.sinfo'
import { IVMatricula } from '../models/matricula.sinfo'



export function Analizar(Apexs: IVMatricula[], lstCruzadas: ILstMasiva[]){
   
    //const lista = Apexs.filter(apex => apex.nrc.includes('35701'))

    let lista= []
    
    for (var lst of lstCruzadas) {
        lista.push(Apexs.filter(apex => apex.nrc.includes(lst.nrc)))
        
    }

    return lista
}


export function AnalizarNrc(Apexs: IVMatricula[], find:any):IVMatricula[]{
   
    let lista: IVMatricula[] = []
    
    for (let i = 0; i < find.length; i++){
        Apexs.filter(apex => apex.nrc === find[i].toString()).map((apex)=>
            lista.push(apex) 
        )
    }
    
    return lista
}