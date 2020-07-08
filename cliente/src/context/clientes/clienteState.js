import React , {useReducer }from 'react';

import clienteContext from './clienteContext';
import clienteReducer from './clienteReducer';
import { OBTENER_CLIENTES, AGREGAR_CLIENTE, CLIENTE_ACTUAL, ELIMINAR_CLIENTE, VALIDAR_CLIENTE, LIMPIAR_CLIENTE_ACTUAL, AGREGAR_CLASE_CLIENTE, OBTENER_CLASES_CLIENTE, LIMPIAR_CLASES_CLIENTE } from '../../types';
import clienteAxios from '../../config/axios';
const ClienteState = props => {

    const clientes = [
        {
            "id_cliente": 1,
            "nombre": "Aureliano",
            "apellido_paterno": "Buendia",
            "apellido_materno": "Iguarán",
            "tipo_doc": 1,
            "documento": "77845126",
            "fecha_nacimiento": "2000-03-12T05:00:00.000Z",
            "fecha_alta": "2019-05-15T05:00:00.000Z",
            "fecha_baja": null,
            "estado": 1,
            "email": "aureliano@buendia.com",
            "telefono": "2345678",
            "direccion": "Macondo",
            "sede_id": 1,
            "membresia": "VIP"
        },
        {
            "id_cliente": 2,
            "nombre": "Alejandro",
            "apellido_paterno": "Paredes",
            "apellido_materno": "Diaz",
            "tipo_doc": 1,
            "documento": "12345888",
            "fecha_nacimiento": "1990-05-18T05:00:00.000Z",
            "fecha_alta": "2020-06-20T05:00:00.000Z",
            "fecha_baja": null,
            "estado": {
              "type": "Buffer",
              "data": [
                1
              ]
            },
            "email": "test@test.com",
            "telefono": "789456255",
            "direccion": "asdfasdfsadf",
            "sede_id": 1,
            "membresia": "VIP"
          },{
            "id_cliente": 3,
            "nombre": "Pedro",
            "apellido_paterno": "Perez",
            "apellido_materno": "Mundo",
            "tipo_doc": 1,
            "documento": "00084123",
            "fecha_nacimiento": "1980-05-12T05:00:00.000Z",
            "fecha_alta": "2020-06-21T05:00:00.000Z",
            "fecha_baja": null,
            "estado": {
              "type": "Buffer",
              "data": [
                1
              ]
            },
            "email": "pedro@perez.com",
            "telefono": "123456789",
            "direccion": "Av pedro perez 2043",
            "sede_id": 1,
            "membresia": "ESTANDAR"
          },
          {
            "id_cliente": 7,
            "nombre": "Pablo",
            "apellido_paterno": "Perez",
            "apellido_materno": "Mundo",
            "tipo_doc": 1,
            "documento": "00084126",
            "fecha_nacimiento": "1980-05-12T05:00:00.000Z",
            "fecha_alta": "2020-06-26T05:00:00.000Z",
            "fecha_baja": null,
            "estado": {
              "type": "Buffer",
              "data": [
                1
              ]
            },
            "email": "pedro2@perez.com",
            "telefono": "123456789",
            "direccion": "Av pedro perez 2043",
            "sede_id": 1,
            "membresia": "ESTANDAR"
          }
    ]

    const clases1 = [
      {
          "id_cliente": 1,
          "id_detalle_act": 1
        },
        {
          "id_cliente": 1,
          "id_detalle_act": 2
        },
        {
          "id_cliente": 2,
          "id_detalle_act": 2
        },
        {
          "id_cliente": 3,
          "id_detalle_act": 2
        }
  ]

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
          payload: cliente
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
    const eliminarCliente = clienteId => {
      dispatch({
          type: ELIMINAR_CLIENTE,
          payload: clienteId
      })
    }

    const agregarClaseCliente = registro => {
      dispatch({
        type: AGREGAR_CLASE_CLIENTE,
        payload: registro
      })
    }

    const obtenerClasesCliente = clienteId => {
      dispatch({
        type: OBTENER_CLASES_CLIENTE,
        payload: clienteId
      })
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