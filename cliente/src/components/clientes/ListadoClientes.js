import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Cliente from './Cliente';
import clientesContext from '../../context/clientes/clienteContext';
const ListadoClientes = () => {

    const clienteContext = useContext(clientesContext);
    const {clientes, obtenerClientes} = clienteContext;

    useEffect(()=>{
        obtenerClientes()
    }, [])
    if(clientes.length === 0) {
        return (
            <div className="container">
                <h2>No hay clientes registrados</h2>
                <h3>Comienza creando uno :</h3>
                <br/>
                <Link className="btn btn-primary" to={"/form-cliente"}>Crear nuevo cliente</Link>
            </div>
        )
    }
    return ( 
        <div className="container-fluid">
        <div>
            <h3>Lista Usuarios</h3>
        </div>
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <td>CODIGO</td>
                    <td>NOMBRE</td>
                    <td>APELLIDO</td>
                    <td>TELEFONO</td>
                    <td>EMAIL</td>
                    <td>Fecha Registro</td>
                    <td>TIPO_MEMBRESIA</td>
                    <td>DIRECCION</td>
                    <td>Accion</td>
                </tr>
            </thead>
            <tbody >
                {clientes.map(cliente => (
                    <Cliente key={cliente.id_cliente} cliente={cliente} />
                ))}
            </tbody>
        </table>
    </div>
        );
}
 
export default ListadoClientes;