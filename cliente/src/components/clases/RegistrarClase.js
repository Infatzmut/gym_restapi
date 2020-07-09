import React, { useContext, useState, useEffect } from 'react';
import ClienteContext from '../../context/clientes/clienteContext';

const RegistrarCliente = ({clase, close}) => {
    
    const clienteContext = useContext(ClienteContext);
    const {clientes, obtenerClientes, agregarClaseCliente} = clienteContext;


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
            console.log('Error');
            return;
        }
        agregarClaseCliente(registro);
        close()
    }
    
    return ( 
        <div>
            <form onSubmit={onSubmit}>
            <select name="cliente" onChange={handleChange}>
                <option value="">------Seleccione ---------</option>
                {clientes.map(cliente => <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nombre} {cliente.apellido_paterno}</option>)}
            </select>
            <button>Registrar</button>
            </form>
        </div>
     );
}
 
export default RegistrarCliente;