import { OBTENER_CLIENTES, AGREGAR_CLIENTE, VALIDAR_CLIENTE, CLIENTE_ACTUAL, ELIMINAR_CLIENTE, EDITAR_CLIENTE, LIMPIAR_CLIENTE_ACTUAL, AGREGAR_CLASE_CLIENTE, OBTENER_CLASES_CLIENTE, LIMPIAR_CLASES_CLIENTE} from "../../types";

export default (state,action) => {
    switch(action.type) {
        case OBTENER_CLIENTES:
            return {
                ...state,
                clientes: action.payload
            }
        case AGREGAR_CLIENTE:
            return {
                ...state,
            }
        case VALIDAR_CLIENTE:
            return {
                ...state,
                errorFormulario: action.payload
            }
        case EDITAR_CLIENTE:
            return {
                ...state,
                clientes: state.clientes.map(cliente => cliente.id_cliente === action.payload.id_cliente ? action.payload : cliente)
            }        
        case CLIENTE_ACTUAL:
            return {
                ...state,
                clienteActual: action.payload
            }
        case LIMPIAR_CLIENTE_ACTUAL:
            return {
                ...state,
                clienteActual: null
            }    
        case AGREGAR_CLASE_CLIENTE:
            return {
                ...state,
                clasesCliente : [
                    action.payload
                    ,...state.clasesCliente
                ]
            }    
        case ELIMINAR_CLIENTE:
            return {
                ...state,
                clientes: state.clientes.filter(cliente => cliente.id_cliente !== action.payload),
                clienteActual: null
            }
        case OBTENER_CLASES_CLIENTE:
            return {
                ...state,
                clasesCliente: state.clases.filter(clase => clase.id_cliente === action.payload)
            }
        case LIMPIAR_CLASES_CLIENTE:
            return {
                ...state,
                clasesCliente: null
            }                
        default: 
            return state;
    }
}