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
    nrc :string
    course_id :string
    course_name :string
    periodo :string
    usuario :string
    cursodisponible :string
    usuariovisiblecurso :string
    useractivobb :string
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