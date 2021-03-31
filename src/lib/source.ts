
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

/*
export function removeDuplicatesEstudiante(data: IVMatricula[]) {
    
    let hash: any = {};
    
    data = data.filter((o:IVMatricula) => hash[o.id_alumno] ? false : hash[o.id_alumno] = true);//hash[o.cursoid]

    return data
}
*/
