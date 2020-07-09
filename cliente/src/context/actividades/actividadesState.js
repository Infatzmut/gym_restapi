import React, { useReducer } from 'react';
import actividadesContext from './actividadesContext';
import actividadesReducer from './actividadesReducer';
import clienteAxios from '../../config/axios';
import {
    ACTIVIDAD_ACTUAL,
    OBTENER_ACTIVIDADES,
    OBTENER_CLASES_ACTIVIDAD
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
            console.log(error);
        }
    }

    const obtenerActividadActual = async actividadId => {
        try{
            const resultado = await clienteAxios.get(`/activities/${actividadId}`);
            const actividad = resultado.data;
            console.log(actividad.data[0])
            dispatch({
                type: ACTIVIDAD_ACTUAL,
                payload: actividad.data[0]
            })
        }catch(error){
            console.log(error);
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
            console.log(error)
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
                obtenerClasesActividad
            }}
        >
            {props.children}
        </actividadesContext.Provider>
    )
}


export default ActividadState;