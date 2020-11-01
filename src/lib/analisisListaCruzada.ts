import { findAllByAltText, findAllByPlaceholderText } from '@testing-library/react'
import { IEnrolamiento } from '../models/enrolamiento'
import { ILstMasiva } from '../models/listacruzada.sinfo'
import { IVMatricula } from '../models/matricula.sinfo'
import Apex from '../pages/Apex'
import { removeDuplicatesCurso, removeDuplicatesEstudiante } from './source'



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
        Apexs.filter(apex => apex.nrc === find[i].toString().trim())
             .filter(apex => apex.calificable === 'Y')
             .filter(apex => apex.pago !== 'PaganteN')
             .map((apex) => lista.push(apex) )
    }
    
    return lista
}

export function AnalizarBBMat(BBMatriculados: IEnrolamiento[], ApexMatriculados: IVMatricula[]) {
    
    let listaBB: IVMatricula[] = []
    let lista: IVMatricula[] = []
    let newLista: IVMatricula[] = []
        
    for (let i = 0; i < BBMatriculados.length; i++){
        ApexMatriculados.filter(apexMat => apexMat.cursoid === BBMatriculados[i].course_id &&
                                            apexMat.id_alumno === BBMatriculados[i].student_id 
                                )
                        .map(apexMat=> listaBB.push(apexMat))
    }

    listaBB = removeDuplicatesEstudiante(listaBB)

    let index:number =0
    for (let j = 0; j < listaBB.length; j++) {
        index = ApexMatriculados.indexOf(listaBB[j])
        ApexMatriculados.splice(index,1)
        
    }

    return ApexMatriculados
    
}