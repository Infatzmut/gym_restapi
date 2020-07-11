import React , {useReducer }from 'react';

import clienteContext from './clienteContext';
import clienteReducer from './clienteReducer';
import { OBTENER_CLIENTES, 
          AGREGAR_CLIENTE, 
          CLIENTE_ACTUAL, 
          ELIMINAR_CLIENTE, 
          VALIDAR_CLIENTE, 
          LIMPIAR_CLIENTE_ACTUAL, 
          AGREGAR_CLASE_CLIENTE, 
          OBTENER_CLASES_CLIENTE, 
          LIMPIAR_CLASES_CLIENTE, 
          ERROR_ELIMINAR_CLIENTE,
          ELIMINAR_CLASE_CLIENTE } from '../../types';
import clienteAxios from '../../config/axios';
const ClienteState = props => {

    const initialState = {
        clientes: [],
        clases: [],
        error: false,
        errorFormulario: false,
        clienteActual: null,
        clasesCliente: null
    };

    // Dispatch para ejecutr las acciones
    const [state, dispatch] = useReducer(clienteReducer, initialState);

    // funciones para el crud
    const obtenerClientes = async () => {
        try{
          const respuesta = await clienteAxios('/customers');
          const clientes = respuesta.data
          dispatch({
            type: OBTENER_CLIENTES,
            payload: clientes.data
        })   
        }catch(error){
          throw new Error(JSON.stringify(error.response.data))
        }
    }

    const agregarCliente = async cliente => {
        try {
           await clienteAxios.post('/customers/add', cliente); 
          dispatch({
            type: AGREGAR_CLIENTE,
          })
        } catch(error) {
          throw new Error(JSON.stringify(error.response.data));         
        }
    }

    const getCliente = async clienteId => {
      try{
        const respuesta = await clienteAxios.get(`/customers/${clienteId}`)
        const cliente = respuesta.data;
        dispatch({
          type: CLIENTE_ACTUAL,
          payload: cliente.data
      })
      }catch(error){
        throw new Error(JSON.stringify(error.response.data));
      }  
      
    }
    const limpiarCliente = () => {
        dispatch({
          type: LIMPIAR_CLIENTE_ACTUAL
        })
    }

    const validarCliente = estado => {
      dispatch({
        type: VALIDAR_CLIENTE,
        payload: estado
      })
    } 
    const eliminarCliente = async clienteId => {
      try{
        const respuesta = await clienteAxios.delete(`/customers/${clienteId}`);
        dispatch({
          type: ELIMINAR_CLIENTE,
          payload: clienteId
        })  
      }catch (error){
        dispatch({
          type: ERROR_ELIMINAR_CLIENTE,
          payload: error.response.data
        })
        throw new Error(JSON.stringify(error.response.data))      
      }
    }

   

    const obtenerClasesCliente = async clienteId => {
      try {
        const respuesta = await clienteAxios(`/customers/${clienteId}/classes`);
        const clasesCliente = respuesta.data;
        dispatch({
          type: OBTENER_CLASES_CLIENTE,
          payload: clasesCliente.data
        })
      }catch(error) {
        throw new Error(JSON.stringify(error.response.data));     
      }
    }

    const limpiarClasesCliente = () => {
      dispatch({
        type: LIMPIAR_CLASES_CLIENTE        
      })
    }

    const eliminarClaseCliente = async claseId => {
      try {
        await clienteAxios.delete(`/classes/${claseId}`);
        dispatch({
          type: ELIMINAR_CLASE_CLIENTE,
          payload: claseId
        })
      } catch(error) {
        throw new Error(JSON.stringify(error.response.data))
      }
    }

    return (
        <clienteContext.Provider
            value = {{
                clientes: state.clientes,
                clases: state.clases,
                error: state.error,
                errorFormulario: state.errorFormulario,
                clienteActual: state.clienteActual,
                clasesCliente: state.clasesCliente,
                obtenerClientes,
                validarCliente,
                agregarCliente,
                getCliente,
                limpiarCliente,
                eliminarCliente,
                obtenerClasesCliente,
                limpiarClasesCliente,
                eliminarClaseCliente
            }}
        >
            {props.children}
        </clienteContext.Provider>
    )
}

export default ClienteState;