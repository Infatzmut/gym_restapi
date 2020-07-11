import React, {useReducer} from 'react';
import clienteAxios from '../../config/axios';
import personalReducer from './personalReducer';
import personalContext from './personalContext';
import { 
    OBTENER_PERSONAL, 
    PERSONAL_ACTUAL, 
    OBTENER_CLASES_ENTRENADOR,
    OBTENER_ACTIVIDADES_ENTRENADOR,
    LIMPIAR_PERSONAL_ACTUAL,
    ELIMINAR_PERSONAL,
    EDITAR_PERSONAL, 
    AGREGAR_PERSONAL, 
    VALIDAR_PERSONAL,
} from '../../types';

const PersonalState = props => {
    const initialState = {
        personal: [],
        personalActual: null,
        errorFormulario: false,
        clasesTrainer: null,
        actividades: null
    }

    const [state, dispatch] = useReducer(personalReducer, initialState);

    const obtenerPersonal = async () => {
        try{
            const respuesta = await clienteAxios('/personal');
            const personal = respuesta.data;
            dispatch({
                type: OBTENER_PERSONAL,
                payload: personal.data
            })
        }catch(error){
            console.log(error.response.data);
        }
    }

    const agregarPersonal = async nuevoPersonal => {
        try{
            await clienteAxios.post('/personal/', nuevoPersonal);
            dispatch({
                type: AGREGAR_PERSONAL
            })
        }catch(error){
            throw new Error(JSON.stringify(error.message))
        }
    }

    const mostrarError = estado => {
        dispatch({
            type: VALIDAR_PERSONAL,
            payload: estado
        })
    }

    const seleccionarPersonal = async personalId => {
        try {
            const respuesta = await clienteAxios(`/personal/${personalId}`);
            const personaActual = respuesta.data;
            dispatch({
                type: PERSONAL_ACTUAL,
                payload: personaActual.data
            })
        } catch(error){
            throw new Error(JSON.stringify(error.message))
        }
    }

    const obtenerClasesTrainer = async entrenadorId =>{
        try {
            const respuesta = await clienteAxios(`/personal/${entrenadorId}/scheduledActivities`);
            const clasesTrainer = respuesta.data;
            dispatch({
                type: OBTENER_CLASES_ENTRENADOR,
                payload: clasesTrainer.data
            })
        } catch(error){
            throw new Error(JSON.stringify(error.message))
        }
    }
    
    const obtenerActividades = async entrenadorId => {
        try {   
            const respuesta = await clienteAxios(`/personal/${entrenadorId}/activities`);
            const actividades = respuesta.data;
            dispatch({
                type:  OBTENER_ACTIVIDADES_ENTRENADOR,
                payload: actividades.data 
            })
        } catch(error){
            throw new Error(JSON.stringify(error.message))
        }
    }

    const modificarPersonal = async nuevoPersonal => {
        try {
            const respuesta = await clienteAxios.put(`/personal/${nuevoPersonal.id_colaborador}`, nuevoPersonal);
            dispatch({
                type: EDITAR_PERSONAL,
                dispatch: nuevoPersonal
            })
        } catch(error){
            throw new Error(JSON.stringify(error.message))
        }
    }

    const limpiarPersonalActual = () => {
        dispatch({
            type: LIMPIAR_PERSONAL_ACTUAL
        });
    }

    const eliminarPersonal = async personalId => {
        try{
            await clienteAxios.delete(`/personal/${personalId}`);
            dispatch({
                type: ELIMINAR_PERSONAL,
                payload: personalId
            })
        } catch(error){
            throw new Error(JSON.stringify(error.response.data))
        }
    }

    return (
        <personalContext.Provider
            value={{
                personal: state.personal,
                personalActual: state.personalActual,
                errorFormulario: state.errorFormulario,
                clasesTrainer: state.clasesTrainer,
                actividades: state.actividades,
                obtenerPersonal,
                mostrarError,
                agregarPersonal,
                modificarPersonal,
                seleccionarPersonal,
                obtenerClasesTrainer,
                obtenerActividades,
                limpiarPersonalActual,
                eliminarPersonal
            }}
        >
            {props.children}
        </personalContext.Provider>
    )
}

export default PersonalState;