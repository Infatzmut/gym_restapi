import {
    OBTENER_PERSONAL,
    VALIDAR_PERSONAL,
    PERSONAL_ACTUAL,
    EDITAR_PERSONAL,
    ELIMINAR_PERSONAL,
    OBTENER_ACTIVIDADES_ENTRENADOR,
    LIMPIAR_PERSONAL_ACTUAL,
    OBTENER_CLASES_ENTRENADOR,
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case OBTENER_PERSONAL:
            return {
                ...state,
                personal : action.payload
            }
        case VALIDAR_PERSONAL:
            return {
                ...state,
                errorFormulario: action.payload
            }    
        case PERSONAL_ACTUAL:
            return {
                ...state,
                personalActual: action.payload
            }
        case ELIMINAR_PERSONAL:
            return {
                ...state,
                personal: state.personal.filter(person => person.id_colaborador !== action.payloa)
            }
        case OBTENER_CLASES_ENTRENADOR:
            return {
                ...state,
                clasesTrainer: action.payload
            }
        case OBTENER_ACTIVIDADES_ENTRENADOR:
            return {
                ...state,
                actividades: action.payload
            }    
        case LIMPIAR_PERSONAL_ACTUAL:
            return {
                ...state,
                personalActual: null,
                clasesTrainer: null,
                actividades: null
            }                          
        default : 
            return state;
    }
}