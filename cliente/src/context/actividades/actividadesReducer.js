import { OBTENER_ACTIVIDADES, ACTIVIDAD_ACTUAL, OBTENER_CLASES_ACTIVIDAD, AGREGAR_CLASE_CLIENTE } from '../../types'

export default (state, action) => {
    switch(action.type) {
        case OBTENER_ACTIVIDADES:
            return {
                ...state,
                actividades: action.payload 
            }
        case ACTIVIDAD_ACTUAL:
            return {
                ...state,
                actividadActual : action.payload
            }
        case OBTENER_CLASES_ACTIVIDAD:
            return {
                ...state,
                clasesActividad: action.payload
            }        
        case AGREGAR_CLASE_CLIENTE:
            return {
                ...state,
                clasesActividad: state.clasesActividad.map(clase => clase.id === action.payload ? clase.capacidad = clase.capacidad-1 :clase )
            }    
        default: 
            return state;
    }
}