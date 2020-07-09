import React, { Fragment, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import RegistrarCliente from './RegistrarClase';
import clientesContext from '../../context/clientes/clienteContext';

const Clase = ({clase}) => {
    
    const [show, setShow] = useState(false)
    const clienteContext = useContext(clientesContext);
    const {clienteActual} = clienteContext;
    const handleClose = () => {
      setShow(false);
    }
    return (
        <Fragment> 
        <div className="card">
        <div className="card-header">
          Featured
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          {clienteActual ? null : <a href="#" className="btn btn-primary" onClick={()=>setShow(true)}>Go somewhere</a>}
        </div>
      </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <RegistrarCliente close={handleClose} clase={clase}/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>        
            </Modal> 
        </Fragment>
        )
}
 
export default Clase;