import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import personalContext from '../../context/personal/personalContext';
import Personal from './Personal';
import '../styles/Listado.css';
import '../styles/ListadoClientes.css';
const ListadoPersonal = () => {

    const personContext = useContext(personalContext);
    const {personal, obtenerPersonal} = personContext;
    
    useEffect(() =>{
        obtenerPersonal();
    },[]);

    if(personal.length === 0) {
        return (
            <div className="no-clients-container container">
                <h2 className="no-clients-title">No hay personal registrados</h2>
                <h3 className="no-clients-subtitle">Comienza creando uno :</h3>
                <br/>
                <Link className="btn btn-primary" to={"/form-personal"}>Registrar Personal</Link>
            </div>
        )
    }
    return ( 
        <div className="container">
        <div className="list-title">
            <h3>Listado Personal</h3>
        </div>
        <table className="table table-hover">
            <thead className="thead-light">
                <tr>
                    <td>CODIGO</td>
                    <td>NOMBRE</td>
                    <td>APELLIDO</td>
                    <td>TELEFONO</td>
                    <td>EMAIL</td>
                    <td>DIRECCION</td>
                    <td>ACCION</td>
                </tr>
            </thead>
            <tbody >
                {personal.map(personal => (
                    <Personal key={personal.id_colaborador} personal={personal} />
                ))}
            </tbody>
        </table>
    </div> 
);
}
 
export default ListadoPersonal;