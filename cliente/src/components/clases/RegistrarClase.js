import React, { useContext, useState, useEffect } from 'react';
import ClienteContext from '../../context/clientes/clienteContext';
import ActividadContext from '../../context/actividades/actividadesContext';
import Swal from 'sweetalert2'
const RegistrarCliente = ({clase, close}) => {
    
    const clienteContext = useContext(ClienteContext);
    const {clientes, obtenerClientes} = clienteContext;

    const actividadContext = useContext(ActividadContext);
    const {agregarClaseCliente} = actividadContext;

    const [registro, guardarRegistro] = useState({
        cliente: '',
        claseId: clase.id_clase
    })

    useEffect(()=>{
        obtenerClientes();
    },[])

    const handleChange = (e) => {
        guardarRegistro({
            ...registro,
            [e.target.name] : Number(e.target.value) 
        })
    }
    const {cliente} = registro 
    const onSubmit= (e) => {
        e.preventDefault();
        if(!cliente){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Your work has not been saved',
                showConfirmButton: false,
                timer: 1500
              })
            return;
        }
        agregarClaseCliente(registro)
        .then(_ => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cliente registrado',
                showConfirmButton: false,
                timer: 1500
              })
              close()   
        })
        .catch(error => {
            error = JSON.parse(error.message);
            Swal.fire(
                `${error.status}`,
                `${error.message}`,
                `${error.status.toLowerCase()}`
            ) ;
        });
    }
    
    return ( 
        <div>
            <form onSubmit={onSubmit}>
            <div class="form-group">
                <label for="">Seleccione cliente a registrar</label>
                <select className="form-control" name="cliente" onChange={handleChange}>
                <option value="">------Seleccione ---------</option>
                {clientes.map(cliente => <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nombre} {cliente.apellido_paterno}</option>)}
                </select>
                <button className="btn btn-primary">Registrar</button>
            </div>
            </form>
        </div>
     );
}
 
export default RegistrarCliente;