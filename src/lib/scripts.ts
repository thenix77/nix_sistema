import { IPublicAlumno } from "../models/public/alumnos.model";
import { IPublicCurso } from "../models/public/cursos.model";
import { ISupervisores } from "../models/public/supervisores";



export function ScriptAlumno(alumno:IPublicAlumno){
   
    let scripts = [{
        script:''
    }]
 
    if(alumno.deuda === 'N'  && alumno.matriculable === 'Y'){

        scripts.push( 
          /*  {
                script:`CLONAR_POST-Curso $token $URL_sitio courseId: ${alumno.patron} ${alumno.id_curso}`
            },
            {
                script:`CURSO_PATCH-Periodo $token $URL_sitio courseId:${alumno.id_curso} externalId:${alumno.periodo}`
            },*/
            {
                script:`ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:${alumno.course_id} externalId:${alumno.batch_uid} S`   
            }
        )
        

        return scripts
    }

    if(alumno.condicion_acad === 'Y' && alumno.usuariovisiblecurso === 'Y'){
        
        scripts.push(
            {
                script:`ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:${alumno.course_id} externalId:${alumno.batch_uid} No`
            },
        )
        
        return scripts
    }

    if(alumno.deuda === 'N'  && alumno.matriculable === 'Y' && alumno.usuarioenrolado ==='N'){
        
        scripts.push(
            {
                script:`ENROLAMIENTO_PUT-crear $token $URL_sitio courseId${alumno.course_id} externalId:${alumno.batch_uid} S`
            },
        )
        
        
        return scripts
    }
        

    if(alumno.deuda === 'N' && alumno.batch_uid === 'Y' && alumno.usuarioenrolado === 'Y' && alumno.usuariovisiblecurso === 'N'){
        
        scripts.push(
            {
                script:`ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:${alumno.course_id} externalId:${alumno.batch_uid} Yes`
            },
        )
        

        return scripts
    }

    if(alumno.deuda === 'Y'   && alumno.usuarioenrolado === 'Y' && alumno.usuariovisiblecurso === 'Y'){
        scripts.push(
            {
                script:`ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:${alumno.batch_uid} externalId:${alumno.batch_uid} Yes`
            },
        )
        
        return scripts
    }
    return scripts
}

export function ScriptCrearCursos(curso:IPublicCurso):string{

    if(curso.matriculable === 'Y' && curso.cursocreado === 'N' )
        return `CLONAR_POST-Curso $token $URL_sitio courseId:${curso.patron} ${curso.course_id}` 

    return ''
}

export function ScriptPeriodoCursos(curso:IPublicCurso):string{

    if(curso.matriculable === 'Y' && curso.cursocreado === 'N' )
        return `CURSO_PATCH-Periodo $token $URL_sitio courseId:{curso.course_id} externalId:${curso.periodo}` 

    return ''
}

export function ScriptSupervisorCursos(curso:IPublicCurso,Supervisor:ISupervisores):string{

    if(curso.matriculable === 'Y' && curso.cursocreado === 'N' )
        return `ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:${curso.course_id} userName:${Supervisor.name} Sup` 

    return ''
}