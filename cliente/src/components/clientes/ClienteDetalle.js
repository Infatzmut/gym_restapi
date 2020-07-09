import React, { useContext, useEffect } from 'react';
import clientesContext from '../../context/clientes/clienteContext';
import ListadoClases from '../clases/ListadoClases'
const ClienteDetalle = ({cliente}) => {
  
  const clienteContext = useContext(clientesContext);
  const {clasesCliente} = clienteContext;
  
  return ( 
      <div>
        <p>{cliente.id_cliente}</p>
        <p>{cliente.nombre}</p>
        <p>{cliente.apellido_paterno}</p>
        <p>{cliente.apellido_materno}</p>
        <p>{cliente.email}</p>
        <p>{cliente.telefono}</p>
        <p>{cliente.fecha_nacimiento}</p>
        <p>{cliente.nombre}</p>
        <p>{cliente.id_cliente}</p>
        <p>{cliente.nombre}</p>
        <ListadoClases key= {cliente.id_cliente} clases = {clasesCliente}/>
      </div>
     );
}
 
export default ClienteDetalle;