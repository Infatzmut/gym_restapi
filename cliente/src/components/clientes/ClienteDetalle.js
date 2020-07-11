import React, { useContext, useEffect } from 'react';
import clientesContext from '../../context/clientes/clienteContext';
import ListadoClases from '../clases/ListadoClases'
const ClienteDetalle = ({cliente}) => {
  
  const clienteContext = useContext(clientesContext);
  const {clasesCliente} = clienteContext;
  
  const nacimiento = new Date(cliente.fecha_nacimiento);
  const registro = new Date(cliente.fecha_alta);
  return ( 
      <div className="text-justify">
        <p><b>ID CLIENTE:</b>  <span>{cliente.id_cliente}</span></p>
        <p><b>NOMBRE:</b> <span>{cliente.nombre}</span></p>
        <p><b>APELLIDO PATERNO:</b> <span>{cliente.apellido_paterno}</span></p>
        <p><b>APELLIDO MATERNO:</b> <span>{cliente.apellido_materno}</span></p>
        <p><b>EMAIL:</b> <span>{cliente.email}</span></p>
        <p><b>TELEFONO:</b> <span>{cliente.telefono}</span></p>
        <p><b>FECHA NACIMIENTO:</b> <span>{nacimiento.toDateString()}</span></p>
        <p><b>FECHA REGISTRO:</b> <span>{registro.toDateString()}</span></p>
        <p><b>DIRECCION:</b> <span>{cliente.id_cliente}</span></p>
        <p><b>MEMBRESIA:</b> <span>{cliente.membresia}</span></p>
        <ListadoClases key= {cliente.id_cliente} clases = {clasesCliente}/>
      </div>
     );
}
 
export default ClienteDetalle;