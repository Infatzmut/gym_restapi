import React, {Fragment, useContext, useState } from 'react';
import personalContext from '../../context/personal/personalContext';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import PersonalDetalle from './PersonalDetalle';


const Personal = ({personal}) => {

    const personContext = useContext(personalContext);
    const {personalActual,limpiarPersonalActual, obtenerActividades, eliminarPersonal,obtenerClasesTrainer, seleccionarPersonal} = personContext;

    const [inspeccionar, mostrarInspeccionar] = useState(false);

    const handleInspec = () => {
        seleccionarPersonal(personal.id_colaborador)
        .catch(error => {
            error = JSON.parse(error.message);
            Swal.fire(
                `${error.status}`,
                `${error.message}`,
                `${error.status.toLowerCase()}`
            ) ;
        });
        obtenerClasesTrainer(personal.id_colaborador)
        .catch(error => {
            error = JSON.parse(error.message);
            Swal.fire(
                `${error.status}`,
                `${error.message}`,
                `${error.status.toLowerCase()}`
            ) });
        obtenerActividades(personal.id_colaborador)
        .catch(error => {
            error = JSON.parse(error.message);
            Swal.fire(
                `${error.status}`,
                `${error.message}`,
                `${error.status.toLowerCase()}`
            ) });
        mostrarInspeccionar(true)
    }

    const closeInspect = () => {
        mostrarInspeccionar(false);
        limpiarPersonalActual();
        
    }
    const handleDelete = () => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "El(la) entrenador(a) seleccionado(a) podria tener clases registradas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                eliminarPersonal(personal.id_colaborador)
                    .then(_ => {
                        closeInspect()
                        Swal.fire(
                        'Deleted!',
                        'Personal Eliminado.',
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
    return ( 
        <>
        <tr>
            <td>{personal.id_colaborador}</td>
            <td>{personal.nombre}</td>
            <td>{personal.apellido_paterno}</td>
            <td>{personal.telefono}</td>
            <td>{personal.email}</td>
            <td>{personal.direccion}</td>
            <td><button className="btn btn-info" onClick={handleInspec}><i className="fa fa-info"></i></button>
            <button className="btn btn-danger" onClick={()=> handleDelete()}><i className="fa fa-ban"></i></button></td>
        </tr>

        <Modal show={inspeccionar} onHide={closeInspect}>
        {personalActual ? (
            <Fragment>
                <Modal.Header closeButton>
                <Modal.Title>{personalActual.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PersonalDetalle personal={personalActual}/>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-danger" onClick={()=>handleDelete()}>Eliminar</button>
                </Modal.Footer>
            </Fragment>) : 
            <p>is Loading</p> }       
            </Modal> 
            </>
        );
        }
 
export default Personal;