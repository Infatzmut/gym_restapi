import { OBTENER_ACTIVIDADES, ACTIVIDAD_ACTUAL } from '../../types'

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
                actividadActual : state.actividades.filter(actividad => actividad.id_actividad === action.payload)
            }    
        default: 
            return state;
    }
}