import React, { Fragment, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import RegistrarCliente from './RegistrarClase';
import clientesContext from '../../context/clientes/clienteContext';
import PersonalContext from '../../context/personal/personalContext';
const Clase = ({clase}) => {
    
    const [show, setShow] = useState(false)
    const clienteContext = useContext(clientesContext);
    const personalContext = useContext(PersonalContext);

    const {clienteActual, eliminarClaseCliente} = clienteContext;
    const {personalActual} = personalContext;

    const date = new Date(clase.fechal);

    const handleClose = () => {
      setShow(false);
    }

    const sucessRegistro = () => {
      clase.capacidad = clase.capacidad-1;
      setShow(false)
    }

    const eliminarClase = () => {
      Swal.fire({
        title: '¿Estas Seguro?',
        text: "¿Desea eliminar la clase registrada?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          eliminarClaseCliente(clase.id_clase)
          .then(_ => {
            Swal.fire(
              'Deleted!',
              'Clase Eliminada.',
              'success'
            )
          }).catch(error=>{
            error = JSON.parse(error.message);
            Swal.fire(
                `${error.status}`,
                `${error.message}`,
                `${error.status.toLowerCase()}`
            ) ;
        })
      }
    })
      

    }
    return (
        <Fragment> 
        <div className="card">
        <div className="card-header">
          {date.toDateString()}
          {clienteActual ? <button className="btn btn-danger" onClick={eliminarClase}><i className="fa fa-delete"></i></button>: null}
        </div>
        <div className="card-body">
          {clienteActual ? <h5 className="card-title">Actividad: {clase.actividad}</h5>: null}
          <h5 className="card-title">Instructor : {clase.nombre} {clase.apellido_paterno}</h5>
          <p className="card-text">Inicio: {clase.hora_inicio}  Fin: {clase.hora_fin}</p>
          {clienteActual  ? null  : <p className="card-text">Capacidad: {clase.capacidad}</p>}
          {clienteActual || personalActual? null  : <a href="#" className="btn btn-primary" onClick={()=>setShow(true)}>Registrar a Clase</a>}
        </div>
      </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  Registro Clase
                </Modal.Header>
                <Modal.Body>
                    <RegistrarCliente close={sucessRegistro} clase={clase}/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>        
            </Modal> 
        </Fragment>
        )
}
 
export default Clase;