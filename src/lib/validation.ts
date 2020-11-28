export function ValidarNumero(cadena: string):boolean {
    
    var valoresAceptados = /^[0-9]+$/;
    
    return cadena.match(valoresAceptados) ? true : false
}

export function ValidarNumeroComa(cadena: string):boolean {
    
    var valoresAceptados = /^[0-9, ]+$/;
    
    return cadena.match(valoresAceptados) ? true : false
}

export function ValidarTexto(cadena: string):boolean {
    
    var valoresAceptados = /^[a-zA-Z ]+$/;
    
    return cadena.match(valoresAceptados) ? true : false
      
  
}
export function ValidarTextoComa(cadena: string):boolean {
    
    var valoresAceptados = /^[a-zA-Z, ]+$/;
    
    return cadena.match(valoresAceptados) ? true : false
      
  
}

export function ValidarEmail(cadena: string):boolean {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
       return emailRegex.test(cadena)? true : false
}