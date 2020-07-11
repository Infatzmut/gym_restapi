import React, { useReducer } from 'react';
import actividadesContext from './actividadesContext';
import actividadesReducer from './actividadesReducer';
import clienteAxios from '../../config/axios';
import {
    ACTIVIDAD_ACTUAL,
    OBTENER_ACTIVIDADES,
    OBTENER_CLASES_ACTIVIDAD,
    AGREGAR_CLASE_CLIENTE
} from '../../types';
const ActividadState = (props) => {

    
    const initialState = {
        actividades:[],
        actividadActual: null,
        clasesActividad :null
    };

    const [state, dispatch] = useReducer(actividadesReducer, initialState);

    const obtenerActividades = async () => {
        try{
            const resultado = await clienteAxios.get('/activities');
            const actividades = resultado.data;
            dispatch({
                type: OBTENER_ACTIVIDADES,
                payload: actividades.data
            })
        } catch(error){
            throw new Error(JSON.stringify(error.response.data))
        }
    }

    const obtenerActividadActual = async actividadId => {
        try{
            const resultado = await clienteAxios.get(`/activities/${actividadId}`);
            const actividad = resultado.data;
            dispatch({
                type: ACTIVIDAD_ACTUAL,
                payload: actividad.data[0]
            })
        }catch(error){
            throw new Error(JSON.stringify(error.response.data))
        }
    }

    const obtenerClasesActividad = async actividadId => {
        try{
            const respuesta = await clienteAxios(`/activities/${actividadId}/scheduledClases`);
            const clases = respuesta.data;
            dispatch({
                type: OBTENER_CLASES_ACTIVIDAD,
                payload: clases.data
            })    
        }catch(error){
            throw new Error(JSON.stringify(error.response.data))
        }
        
    }

    const agregarClaseCliente = async registro => {
        try{
          await clienteAxios.post(`/classes`, registro);
          dispatch({
            type: AGREGAR_CLASE_CLIENTE,
            payload: registro.claseId
          })
        }catch(error){
            throw new Error(JSON.stringify(error.response.data))
        }
      
    }
    return (
        <actividadesContext.Provider
            value={{
                actividades: state.actividades,
                actividadActual: state.actividadActual,
                clasesActividad: state.clasesActividad,
                obtenerActividades,
                obtenerActividadActual,
                obtenerClasesActividad,
                agregarClaseCliente
            }}
        >
            {props.children}
        </actividadesContext.Provider>
    )
}


export default ActividadState;