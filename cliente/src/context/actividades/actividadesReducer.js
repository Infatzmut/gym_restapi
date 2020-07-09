import { OBTENER_ACTIVIDADES, ACTIVIDAD_ACTUAL, OBTENER_CLASES_ACTIVIDAD } from '../../types'

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
        default: 
            return state;
    }
}