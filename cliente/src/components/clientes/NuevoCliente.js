import React, {useState, useContext, useEffect} from 'react';
import '../styles/NuevoCliente.css';
import clienteContext from '../../context/clientes/clienteContext';
import Swal from 'sweetalert2'
const NuevoCliente = () => {

    const [cliente, guardarCliente] = useState({
        nombre:'',
        apellido_paterno:'',
        apellido_materno:'',
        fecha_nacimiento: '',
        email:'',
        tipo_doc:'',
        documento: '',
        telefono: '',
        direccion: '',
        membresia: ''
    });

    const clientesContext = useContext(clienteContext);
    const {errorFormulario,agregarCliente,clienteActual, validarCliente} = clientesContext;

    useEffect(()=> {
        if(clienteActual) {
            guardarCliente(clienteActual)
        } else {
            guardarCliente({
                nombre:'',
                apellido_paterno:'',
                apellido_materno:'',
                fecha_nacimiento: '',
                email:'',
                tipo_doc:'',
                documento: '',
                telefono: '',
                direccion: '',
                membresia: ''
            })
        }
    }, [clienteActual])
    

    const {nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, tipo_doc, documento, telefono, direccion, membresia} = cliente;
    const handleChange = e => {
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(!nombre.trim() || !apellido_paterno.trim() ||
            !fecha_nacimiento.trim() || !email.trim() || !tipo_doc || !documento.trim() || !telefono.trim() || !direccion.trim() || !membresia.trim()){
                validarCliente(true)
                return;
            }
        validarCliente(false);
        // Agregar cliente
        if(!clienteActual){
            agregarCliente(cliente)
            .then(_ => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Personal registrado',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  // Reiniciar el form
                guardarCliente({
                    nombre:'',
                    apellido_paterno:'',
                    apellido_materno:'',
                    fecha_nacimiento: '',
                    email:'',
                    tipo_doc:'',
                    documento: '',
                    telefono: '',
                    direccion: '',
                    membresia: ''
                })
            })
            .catch(error => {
                error = JSON.parse(error.message);
                Swal.fire(
                    `${error.status}`,
                    `${error.message}`,
                    `${error.status.toLowerCase()}`
                    );
                });
            } else {

            }
        }
        
    return ( 
        <div className="container">
            {errorFormulario ? <p className="alert alert-error">Todos los campos son obligatorios</p>: null}
            <div className="container-title">
                {clienteActual? <h1>Edicion Cliente</h1>: <h1>Registro Cliente</h1>}
            </div>
            <form  id="formularioCliente" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombres</label>
                    <input type="text" 
                        className="form-control" 
                        name="nombre" 
                        value={nombre} 
                        onChange={handleChange}
                        placeholder="Escriba su nombre" 
                        minLength="3" 
                        maxLength="20" 
                        required pattern="[A-Za-z ]+" autoFocus />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido Paterno</label>
                    <input type="text" 
                        className="form-control" 
                        name="apellido_paterno" 
                        id="ape_pat" 
                        value={apellido_paterno} 
                        onChange={handleChange}
                        placeholder="Escriba su apellido paterno" 
                        minLength="3" 
                        maxLength="20" 
                        required pattern="[A-Za-z]+"/>
                </div>
                <div className="form-group">
                    <label htmlFor="apellido2">Apellido Materno</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="apellido_materno" 
                        id="ape_mat" 
                        value={apellido_materno} 
                        onChange={handleChange}
                        placeholder="Escriba su apellido materno" 
                        minLength="3" 
                        maxLength="20" 
                        pattern="[A-Za-z]+"/>
                </div>
                <div className="form-group">
                    <label htmlFor="fecha_nac">Fecha nacimiento</label>
                    <input 
                        type="date" 
                        className="form-control"  
                        name="fecha_nacimiento" 
                        id="fecha"  
                        value={fecha_nacimiento} 
                        onChange={handleChange}
                        min="1950-01-01" 
                        max="2003-01-01" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        id="email" 
                        value={email} 
                        onChange={handleChange}
                        placeholder="Escriba un correo válido" 
                        minLength="8" 
                        maxLength="45" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tipodocumento">Tipo_Documento</label>
                    <select 
                        className="form-control" 
                        name="tipo_doc" 
                        value={tipo_doc} 
                        onChange={handleChange}
                        id="doc_type" required>
                        <option value="">----Seleccione----</option>
                        <option value="1">DNI</option>
                        <option value="2">PASAPORTE</option>
                        <option value="3">CARNET DE EXTRANJERIA</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="numdocumento">Documento</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="documento" 
                        id="documento" 
                        value={documento} 
                        onChange={handleChange}
                        placeholder="Escriba su documento" 
                        minLength="8" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="numdocumento">Telefono</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="telefono" 
                        id="telefono" 
                        value={telefono} 
                        onChange={handleChange}
                        placeholder="Escriba su documento" 
                        minLength="8" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Direccion</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="direccion" 
                        id="direccion" 
                        value={direccion} 
                        onChange={handleChange}
                        placeholder="Escriba su direccion" 
                        maxLength="35"  
                        required pattern="[A-Za-z0-9 ]+" />
                </div>
                <div className="form-group">
                    <label htmlFor="tipodocumento">Tipo Membresia</label>
                    <select 
                        className="form-control" 
                        name="membresia" 
                        value={membresia} 
                        onChange={handleChange}
                        id="membresia" required>
                        <option value="">----Seleccione----</option>
                        <option value="VIP">VIP</option>
                        <option value="ESTANDAR">ESTANDAR</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" id="submit" className="btn btn-primary" value="Agregar" />
                    <a className="btn btn-danger" href="../">Cancelar</a>
                </div>
            </form>
        </div> 
     );
}
 
export default NuevoCliente;