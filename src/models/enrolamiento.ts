export interface IEnrolamiento {
  batch_uid:    string,
  email:        string,
  lastname:     string,
  firstname:    string,
  habilitado:   string,
  visible:      string,
  course_id:    string,
  course_name:  string,
  periodo:      string,
  role:         string
  nrc:          string
}

  export interface IEnrolamientoBB {
    batch_uid:string
    role :string
    usuariovisible: string
    periodo: string
    course_id: string
    cursocerrado: string
    cursovisible:string
}

export interface IEnrolamientoApex {
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

export interface IVSEnrolamiento{
    periodo: string
    id_alumno: string
    alumno: string
    azonal: string
    acampus:string
    nrc: string
    id_curso: string
    curso: string
    patron:string
    zonal: string
    campus: string
    deuda: string
    retirado: string
    calificable: string
    accesobb: string
    matriculable:string
}

export interface IVBEnrolamiento{
  periodo: string
  id_alumno: string
  alumno: string
  nrc: string
  id_curso: string
  curso: string
  zonal: string
  campus: string
  deuda: string
  retirado: string
  calificable: string
  accesobb: string
  matriculable:string
}

export interface IVInstEnrolamiento{
  periodo: string
  nrc: string
  id_curso: string
  curso: string
  id_inst: string
  instructor: string
  cinstructor: string
  inicio: string
  fin: string
  drestante: number
  activo:string
}