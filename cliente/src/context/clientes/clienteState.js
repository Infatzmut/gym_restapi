import React , {useReducer }from 'react';

import clienteContext from './clienteContext';
import clienteReducer from './clienteReducer';
import { OBTENER_CLIENTES, AGREGAR_CLIENTE, CLIENTE_ACTUAL, ELIMINAR_CLIENTE, VALIDAR_CLIENTE, LIMPIAR_CLIENTE_ACTUAL, AGREGAR_CLASE_CLIENTE, OBTENER_CLASES_CLIENTE, LIMPIAR_CLASES_CLIENTE } from '../../types';
import clienteAxios from '../../config/axios';
const ClienteState = props => {

    const initialState = {
        clientes: [],
        clases: [],
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
          console.log(error);
        }
    }

    const agregarCliente = async cliente => {
        try {
           await clienteAxios.post('/customers/add', cliente); 
          dispatch({
            type: AGREGAR_CLIENTE,
          })
        } catch(error) {
          console.log(error.message)          
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
        console.log(error);
        
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
        console.log(respuesta);
        dispatch({
          type: ELIMINAR_CLIENTE,
          payload: clienteId
        })  
      }catch (error){
        console.log(error);        
      }
    }

    const agregarClaseCliente = async registro => {
        console.log(registro)
        const respuesta = await clienteAxios.post(`/classes`, registro);
        const nuevaClase = respuesta.data;
        console.log(nuevaClase.data);
      
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
        console.log(error);     
      }
    }

    const limpiarClasesCliente = () => {
      dispatch({
        type: LIMPIAR_CLASES_CLIENTE        
      })
    }

    return (
        <clienteContext.Provider
            value = {{
                clientes: state.clientes,
                clases: state.clases,
                errorFormulario: state.errorFormulario,
                clienteActual: state.clienteActual,
                clasesCliente: state.clasesCliente,
                obtenerClientes,
                validarCliente,
                agregarCliente,
                getCliente,
                limpiarCliente,
                eliminarCliente,
                agregarClaseCliente,
                obtenerClasesCliente,
                limpiarClasesCliente
            }}
        >
            {props.children}
        </clienteContext.Provider>
    )
}

export default ClienteState;