import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/';
import alertaReducer from './alertasReducer';
import alertaContext from './alertasContext';
import React, { useReducer } from 'react';

const AlertaState = props => {

    const initialState = {
        alerta : null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    // Funciones 
    const mostrarAlerta = (msg, tipo) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                tipo
            }
        });

        setTimeout(()=>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }
    const ocultarAlerta = () => {
        dispatch({
            type: OCULTAR_ALERTA
        })
    }
    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta,
                ocultarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;