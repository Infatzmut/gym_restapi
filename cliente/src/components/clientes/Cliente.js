import React, { useEffect, useContext, useState, Fragment } from 'react';
import Swal from 'sweetalert2'
import clienteContext from '../../context/clientes/clienteContext';
import Modal from 'react-bootstrap/Modal'
import ClienteDetalle from './ClienteDetalle'
import NuevoCliente from './NuevoCliente';
const Cliente = ({cliente}) => {
    
    const clientesContext = useContext(clienteContext);
    const { clienteActual,getCliente,eliminarCliente,obtenerClasesCliente,error, limpiarClasesCliente, limpiarCliente} = clientesContext;


    const [inspeccionar, mostrarInspeccionar] = useState(false);
    const [editar, mostrarEditar] = useState(false);
    
    const handleInspec = (state) => {
        if(state){
            obtenerClasesCliente(cliente.id_cliente)
        }
        mostrarInspeccionar(state)
    }
    
    const closeInspect = () => {
        handleInspec(false);
        limpiarCliente();
        limpiarClasesCliente()
        
    }
    const handleEdit = (state) => {
        mostrarEditar(state);
    }

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "El cliente seleccionado podria tener clases registradas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                eliminarCliente(cliente.id_cliente)
                    .then(_ => {
                        handleInspec(false)
                        Swal.fire(
                        'Deleted!',
                        'Cliente Eliminado.',
                        'success'
                    )
                    })
                    .catch(error=>{
                        error = JSON.parse(error.message);
                        Swal.fire(
                            `${error.status}`,
                            `${error.message}`,
                            `${error.status.toLowerCase()}`
                        ) ;
                    }
                )
            }
        })
    }

    const handleOpenInfo = () => {
        getCliente(cliente.id_cliente);
        handleInspec(true);
    }

    const handleOpenEdit = ()=>{
        getCliente(cliente.id_cliente);
        handleInspec(false);
        handleEdit(true);
    } 

    const handleCloseEdit = () => {
        limpiarCliente();
        handleEdit(false);
    }

    
    return ( 
        <>
        <tr>
            <td>{cliente.id_cliente}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido_paterno}</td>
            <td>{cliente.telefono}</td>
            <td>{cliente.email}</td>
            <td>{cliente.fecha_alta.substring(0,cliente.fecha_alta.indexOf('T'))}</td>
            <td>{cliente.membresia}</td>
            <td>{cliente.direccion}</td>
            <td>
                <button className="btn btn-info" onClick={handleOpenInfo} ><i className="fa fa-info"></i></button>
                <button className="btn btn-danger" onClick={()=> handleDelete()}><i className="fa fa-ban"></i></button>
            </td>
        </tr>
        
            <Modal show={inspeccionar} onHide={closeInspect}>
            {clienteActual ? (
                <Fragment>
                    <Modal.Header closeButton>
                    <Modal.Title>{clienteActual.nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ClienteDetalle cliente={clienteActual}/>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => {
                        handleOpenEdit()
                    }}>Editar</button>
                    <button className="btn btn-danger" onClick={()=>handleDelete()}>Eliminar</button>
                    </Modal.Footer>
                </Fragment>) : 
                <p>is Loading</p> }       
            </Modal> 

            <Modal show={editar} onHide={handleCloseEdit}>
            {clienteActual ? (
                <Fragment>
                    <Modal.Header closeButton>
                    <Modal.Title>Edicion de: {clienteActual.nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NuevoCliente />
                    </Modal.Body>
                </Fragment>) : 
                <p>is Loading</p> }       
            </Modal> 
        </>
    );
}
 
export default Cliente;