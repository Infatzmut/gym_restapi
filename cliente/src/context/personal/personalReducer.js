import {
    OBTENER_PERSONAL,
    AGREGAR_PERSONAL,
    VALIDAR_PERSONAL,
    PERSONAL_ACTUAL,
    EDITAR_PERSONAL,
    ELIMINAR_PERSONAL,
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case OBTENER_PERSONAL:
            return {
                ...state,
                personal : action.payload
            }
        case AGREGAR_PERSONAL:
            return {
                ...state,
                personal: [
                    ...state.personal,
                    action.payload
                ]
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
        case EDITAR_PERSONAL:
            return {
                ...state,
                personal: state.personal.filter(person => person.id_colaborador === action.payload.id_colaborador ? action.payload : person),
                personalActual: null
            }
        case ELIMINAR_PERSONAL:
            return {
                ...state,
                personal: state.personal.filter(person => person.id_colaborador !== action.payload.id_colaborador)
            }                  
        default : 
            return state;
    }
}