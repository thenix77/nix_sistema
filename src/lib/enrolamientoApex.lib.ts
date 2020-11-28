import { IEnrolamientoApex } from "../models/enrolamiento";

export function removerDuplicadosEstudiantesApex(data: IEnrolamientoApex[]) {
   
    let hash: any = {};
    data = data.filter((o: IEnrolamientoApex) => hash[o.id_alumno] ? false : hash[o.id_alumno] = true);//hash[o.cursoid]
    return data
} 

export function removerDuplicadosCursoApex(data: IEnrolamientoApex[]) {
   
    let hash: any = {};
    data = data.filter((o: IEnrolamientoApex) => hash[o.cursoid] ? false : hash[o.cursoid] = true);//hash[o.cursoid]
    return data
}