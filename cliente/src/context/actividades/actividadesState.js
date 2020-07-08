import React, { useReducer } from 'react';
import actividadesContext from './actividadesContext';
import actividadesReducer from './actividadesReducer';
import {
    ACTIVIDAD_ACTUAL,
    OBTENER_ACTIVIDADES,
    OBTENER_CLASES_ACTIVIDAD
} from '../../types';
const ActividadState = (props) => {

    const actividades = [
        {
            "id_actividad": 1,
            "nombre": "Functional",
            "descripcion": "Entrenamiento que utiliza todas las partes del cuerpo para genear un mayor impacto cardiovascular y muscular",
            "imagenRef": "funcional",
            "imagenRef2": null
          },
          {
            "id_actividad": 2,
            "nombre": "Body Cicling",
            "descripcion": "Entrenamiento en bicicleta estática a un ritmo acelerado para estimular el sistema cardiovascular y tonificar los músculos de las piernas",
            "imagenRef": "body-cicling",
            "imagenRef2": null
          },
          {
            "id_actividad": 3,
            "nombre": "Boxeo",
            "descripcion": "El antiguo arte del boxeo en una jaula especial con el equipamiento adecuado",
            "imagenRef": "boxeo",
            "imagenRef2": null
          },
          {
            "id_actividad": 4,
            "nombre": "Muay Thai",
            "descripcion": "El antiguo arte de Muay Thai en una jaula adecuada con el equipamiento respectivo",
            "imagenRef": "muay-thai",
            "imagenRef2": null
          }
    ]

    
    const initialState = {
        actividades:[],
        actividadActual: null,
        clasesActividad :null
    };

    const [state, dispatch] = useReducer(actividadesReducer, initialState);

    const obtenerActividades = () => {
        dispatch({
            type: OBTENER_ACTIVIDADES,
            payload: actividades
        })
    }

    const obtenerActividadActual = actividadId => {
        dispatch({
            type: ACTIVIDAD_ACTUAL,
            payload: actividadId
        })
    }

    const obtenerClasesActividad = actividadId => {
        dispatch({
            type: OBTENER_CLASES_ACTIVIDAD,
            payload: actividadId
        })
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