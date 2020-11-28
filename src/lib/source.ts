import { IBbSinfo } from '../models/bbsinfo'
import { IEnrolamientoBB } from '../models/enrolamiento'
import { IVLstCruzada } from '../models/listacruzada.sinfo'
import { IVMatricula} from '../models/matricula.sinfo'
import { ISupervisores } from '../models/zonal.sinfo'

export function idAlumno(idalumno: string) {
        
        let temp = ''
        
        const cant = idalumno.length
        const cantidadCeros = 9 - cant

        for (var i = 0; i < cantidadCeros ; i++) {
            temp += '0'
        }

       return temp + idalumno
}

export function removeDuplicatesEstudiante(data: IVMatricula[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IVMatricula) => hash[o.id_alumno] ? false : hash[o.id_alumno] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicatesCursoEstudiante(data: IVMatricula[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IVMatricula) => hash[o.id_alumno && o.cursoid] ? false : hash[o.id_alumno && o.cursoid] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicatesListaCruzada(data: IVLstCruzada[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IVLstCruzada) => hash[o.cursoid] ? false : hash[o.cursoid] = true);//hash[o.cursoid]

    return data
}
 
export function removeDuplicatesCurso(data: IVMatricula[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IVMatricula) => hash[o.cursoid] ? false : hash[o.cursoid] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicatesEstudianteBBSinfo(data: IBbSinfo[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IBbSinfo) => hash[o.id_alumno] ? false : hash[o.id_alumno] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicatesSupBBSinfo(data: IBbSinfo[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IBbSinfo) => hash[o.id_inst] ? false : hash[o.id_inst] = true);//hash[o.cursoid]

    return data
}

export function removerDuplicadosSupervisores(data: ISupervisores[]) {
    
    let hash: any = {};
    
    data = data.filter((o:ISupervisores) => hash[o.display] ? false : hash[o.display] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicatesCursoBBSinfo(data: IBbSinfo[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IBbSinfo) => hash[o.cursoid] ? false : hash[o.cursoid] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicatesInstBBSinfo(data: IBbSinfo[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IBbSinfo) => hash[o.cursoid] ? false : hash[o.cursoid] = true);//hash[o.cursoid]

    return data
}

export function removeDuplicatesInstructor(data: IVMatricula[]) {
   
    let hash: any = {};
    data = data.filter((o: IVMatricula) => hash[o.id_inst] ? false : hash[o.id_inst] = true);//hash[o.cursoid]
    return data
}


export function AlumnoCurso(data: IVMatricula[], idalumno: string) {
    
    let cursos = data.filter(alumno => alumno.id_alumno.includes(idAlumno(idalumno)))
    return removeDuplicatesCurso(cursos)
}

export function AlumnoCorreo(idalumno: string) {
    
    
    return idalumno.replace(/\b(0(?!\b))+/g, "")+'@senati.pe'
}


export function Cursos(data: IVMatricula[], cursox: string) {
    
    let newData = data.filter(curso => curso.cursoid.includes(cursox.toUpperCase()))
    newData = removeDuplicatesEstudiante(newData)
    
      return newData
}

export function CursosInstructor(data: IVMatricula[]){

    return removeDuplicatesInstructor(data)
}

export function removerDuplicadosEstudiantesBB(data: IEnrolamientoBB[]) {
   
    let hash: any = {};
    data = data.filter((o: IEnrolamientoBB) => hash[o.batch_uid] ? false : hash[o.batch_uid] = true);//hash[o.cursoid]
    return data
}