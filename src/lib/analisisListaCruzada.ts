import { findAllByAltText, findAllByPlaceholderText } from '@testing-library/react'
import { IEnrolamiento } from '../models/enrolamiento'
import { ILstMasiva } from '../models/listacruzada.sinfo'
import { IVMatricula } from '../models/matricula.sinfo'
import { ICursoSupervisor, ISupervisores } from '../models/zonal.sinfo'
import Apex from '../pages/Apex'
import { removeDuplicatesCurso, removeDuplicatesEstudiante, removeDuplicatesInstructor } from './source'



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
            .map((apex) => lista.push(apex))
        lista = removeDuplicatesEstudiante(lista)
    }
    
    return lista
}

export function AnalizarBBMat(BBMatriculados: IEnrolamiento[], ApexMatriculados: IVMatricula[]) {
    
    let listaBB: IVMatricula[] = []
    
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

export function AnalizarBBInst(BBMatriculados: IEnrolamiento[], ApexMatriculados: IVMatricula[]) {
    
    let listaBB: IVMatricula[] = []
       
    const listaCursos:IVMatricula[] = removeDuplicatesCurso(ApexMatriculados)
    const ApexInst:IVMatricula[] = listaCursos.filter(lst => lst.id_inst !== '')

    console.log('/****Apex***/')
    console.log(ApexInst)
    
    for (let i = 0; i < BBMatriculados.length; i++){
        ApexInst.filter(apexMat =>  apexMat.cursoid === BBMatriculados[i].course_id &&
                                    apexMat.id_inst === BBMatriculados[i].student_id 
                                )
                .map(apexMat=> listaBB.push(apexMat))
    }

    console.log('/*****BB*****/')
    console.log(listaBB)

    let index:number =0
    for (let j = 0; j < listaBB.length; j++) {
        index = ApexInst.indexOf(listaBB[j])
        ApexInst.splice(index,1)
        
    }

    return  ApexInst
    
}

export function SupervisoresCursos(findNrcs: IVMatricula[], Supervisores: ISupervisores[]) {
    
    let sup:ICursoSupervisor[] = []

    for (let j = 0; j < findNrcs.length; j++) {
        
        Supervisores.filter(sup => sup.zonal === findNrcs[j].zonal).map(x => 
            sup.push({curso:findNrcs[j].cursoid , supervisor:x.First ,zonal:x.zonal,correo:x.name   })    
        )
        
    }
    return sup
}