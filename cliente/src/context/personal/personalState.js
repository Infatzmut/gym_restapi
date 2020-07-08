import React, {useReducer} from 'react';
import clienteAxios from '../../config/axios';
import personalReducer from './personalReducer';
import personalContext from './personalContext';
import { 
    OBTENER_PERSONAL, 
    PERSONAL_ACTUAL, 
    OBTENER_CLASES_ENTRENADOR, 
    ELIMINAR_PERSONAL,
    EDITAR_PERSONAL, 
    AGREGAR_PERSONAL, 
    VALIDAR_PERSONAL,
} from '../../types';

const PersonalState = props => {

    const personal = [
        {
            "id_colaborador": 1,
            "nombre": "Juan",
            "apellido_paterno": "Perez",
            "email": "juan@perez.com",
            "telefono": "456789123",
            "direccion": "Av su hogar 2930"
          },
          {
            "id_colaborador": 3,
            "nombre": "Carlos",
            "apellido_paterno": "Perez",
            "email": "carlos@carlos.com",
            "telefono": "123456789",
            "direccion": "Av pedro perez 2043"
          },
          {
            "id_colaborador": 4,
            "nombre": "Carlos",
            "apellido_paterno": "Perez",
            "email": "carlos1@carlos.com",
            "telefono": "123456789",
            "direccion": "Av pedro perez 2043"
          }
    ]


    const initialState = {
        personal: [],
        personalActual: null,
        errorFormulario: false,
        clasesTrainer: null
    }

    const [state, dispatch] = useReducer(personalReducer, initialState);

    const obtenerPersonal = () => {
        dispatch({
            type: OBTENER_PERSONAL,
            payload: personal
        })
    }

    const agregarPersonal = nuevoPersonal => {
        dispatch({
            type: AGREGAR_PERSONAL,
            payload : nuevoPersonal
        })
    }

    const mostrarError = estado => {
        dispatch({
            type: VALIDAR_PERSONAL,
            payload: estado
        })
    }

    const seleccionarPersonal = personalId => {
        dispatch({
            type: PERSONAL_ACTUAL,
            payload: personalId
        })
    }

    const obtenerClasesTrainer = entrenadorId =>{
        dispatch({
            type: OBTENER_CLASES_ENTRENADOR,
            payload: entrenadorId
        })
    } 

    const modificarPersonal = nuevoPersonal => {
        dispatch({
            type: EDITAR_PERSONAL,
            payload: nuevoPersonal
        })
    }

    const eliminarPersonal = personalId => {
        dispatch({
            type: ELIMINAR_PERSONAL,
            payload: personalId
        })
    }

    return (
        <personalContext.Provider
            value={{
                personal: state.personal,
                personalActual: state.personalActual,
                errorFormulario: state.errorFormulario,
                clasesTrainer: state.clasesTrainer,
                obtenerPersonal,
                mostrarError,
                agregarPersonal,
                modificarPersonal,
                seleccionarPersonal,
                obtenerClasesTrainer,
                eliminarPersonal
            }}
        >
            {props.children}
        </personalContext.Provider>
    )
}

export default PersonalState;