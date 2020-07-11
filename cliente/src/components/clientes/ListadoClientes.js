import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Cliente from './Cliente';
import '../styles/ListadoClientes.css';
import '../styles/Listado.css';
import clientesContext from '../../context/clientes/clienteContext';
const ListadoClientes = () => {

    const clienteContext = useContext(clientesContext);
    const {clientes, obtenerClientes} = clienteContext;

    useEffect(()=>{
        obtenerClientes()
    }, [])
    if(clientes.length === 0) {
        return (
            <div className="no-clients-container container">
                <h2 className="no-clients-title">No hay clientes registrados</h2>
                <h3 className="no-clients-subtitle">Comienza creando uno :</h3>
                <br/>
                <Link className="btn btn-primary" to={"/form-cliente"}>Crear nuevo cliente</Link>
            </div>
        )
    }
    return ( 
        <div className="container">
            <div>
                <h3 className="list-title">Lista Usuarios</h3>
            </div>
            <table className="table table-hover">
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