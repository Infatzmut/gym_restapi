import React, {useState, useContext, useEffect} from 'react';
import personalContext from '../../context/personal/personalContext';
const NuevoPersonal = () => {
    
    const personContext = useContext(personalContext);
    const {personalActual ,mostrarError, agregarPersonal, modificarPersonal, limpiarPersonalActual} = personContext;
    // state del form
    const [personal, guardarPersonal] = useState({
        nombre:'',
        apellido_paterno:'',
        apellido_materno:'',
        fecha_nacimiento: '',
        email:'',
        tipo_doc:'',
        documento: '',
        telefono: '',
        direccion: '',
        categoria: ''
    })

    useEffect(() => {
        personalActual !==null?
            guardarPersonal(personalActual):
            guardarPersonal({
                nombre:'',
                apellido_paterno:'',
                apellido_materno:'',
                fecha_nacimiento: '',
                email:'',
                tipo_doc:'',
                documento: '',
                telefono: '',
                direccion: '',
                categoria: ''
            })
    },[personalActual])
    

    const {nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, tipo_doc, documento, telefono, direccion, categoria} = personal;
    const handleChange = e => {
        guardarPersonal({
            ...personal,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(!nombre.trim() || !apellido_paterno.trim() || !apellido_materno.trim() ||
            !fecha_nacimiento.trim() || !email.trim() || !tipo_doc.trim() || !documento.trim() || !telefono.trim() || !direccion.trim() || !categoria.trim()){
                mostrarError(true)
                return;
        } 
        mostrarError(false);

        // Si es edicion o si es nuevo personal
        if(!personalActual) {
            agregarPersonal(personal)
        } else {
            // Actualizar personal existente
            modificarPersonal(personal);
        }

        guardarPersonal({
            nombre:'',
            apellido_paterno:'',
            apellido_materno:'',
            fecha_nacimiento: '',
            email:'',
            tipo_doc:'',
            documento: '',
            telefono: '',
            direccion: '',
            categoria: ''
        })
        limpiarPersonalActual()  
    }
    return ( 
        <div className="container">
            <form  id="formularioCliente" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombres</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Escriba su nombre" 
                        minLength="3" 
                        maxLength="20" 
                        required 
                        pattern="[A-Za-z ]+" 
                        autoFocus 
                        value= {nombre}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido Paterno</label>
                    <input type="text" className="form-control" name="apellido_paterno" value={apellido_paterno} placeholder="Escriba su apellido paterno" minLength="3" maxLength="20" required pattern="[A-Za-z]+" 
                        onChange={handleChange}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido Materno</label>
                    <input type="text" className="form-control" name="apellido_materno" value={apellido_materno} placeholder="Escriba su apellido materno" minLength="3" maxLength="20" required pattern="[A-Za-z]+" 
                    onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha nacimiento</label>
                    <input type="date" className="form-control"  name="fecha_nacimiento" value={fecha_nacimiento}  min="1950-01-01" max="2003-01-01" required onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" value={email} placeholder="Escriba un correo válido" minLength="8" maxLength="45" required onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tipodocumento">Tipo_Documento</label>
                    <select className="form-control" name="tipo_doc" id="doc_type" value={tipo_doc} required onChange={handleChange}>
                        <option value="">----Seleccione----</option>
                        <option value="1">DNI</option>
                        <option value="2">PASAPORTE</option>
                        <option value="3">CARNET DE EXTRANJERIA</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="documento">Documento</label>
                    <input type="text" className="form-control" name="documento" value={documento} id="documento" placeholder="Escriba su documento" minLength="8" required onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Telefono</label>
                    <input type="text" className="form-control" name="telefono" value={telefono} id="documento" placeholder="Escriba su telefono" minLength="7" required onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Direccion</label>
                    <input type="text" className="form-control" name="direccion" value={direccion} id="direccion" placeholder="Escriba su direccion" maxLength="35"  required pattern="[A-Za-z0-9 ]+" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoria</label>
                        <select className="form-control" value={categoria} name="categoria" id="categoria" required onChange={handleChange}>
                            <option value="">----Seleccione----</option>
                            <option value="entrenador">Entrenador</option>
                            <option value="administrativo">Administrativo</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Agregar" />
                    <a className="btn btn-danger" href="../">Cancelar</a>
                </div>
            </form>
        </div>
     );
}
 
export default NuevoPersonal;