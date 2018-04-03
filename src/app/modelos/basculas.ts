export interface Planilla {
    consecutivo: number,
    fecha: string,
    hora?: string,
    lugar: string,
    temperatura_vehiculo: string,
    conductor: string,
    vehiculo: string,
    temperatura: string,
    cliente: string,
    observaciones: string,
    pesos: Pesos[]    
}
export interface Pesos {
    id: number,
    nivel: number,
    producto: string,
    rango: string,
    cantidad: number,
    peso: number,
    peso_promedio: number,
    canasta: number,
    negativo: number,    
}

export interface PesosSumas {
    nivel: number,
    producto: string,
    rango: string,
    cantidad: number,
    peso: number,
    peso_promedio: number,
    canasta: number,  
}

export interface Totales {
    cantidad_pollo: number,
    peso_pollo: number,
    peso_promedio_pollo: number,
    canastas_pollo: number,
    peso_pollo_menudencias: number,
    canastas_pollo_menudencias: number,
}
