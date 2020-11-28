export interface IVMatricula {
  calificable: string;
  nrc: string;
  id_alumno: string;
  periodo:  string
  cursoid: string;
  patron: string;
  id_inst: string;
  instructor: string;
  matcur: string;
  pago: string;
  curso: string;
  tipo: string;
  cdg_status: string;
  zonal: string;
}

export interface IBBCursosMatriculados{
    batch_uid: string
    course_id: string
    role: string
    row_status: string
    sourcedid_id: string
}
