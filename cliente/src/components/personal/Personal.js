import React, { useContext } from 'react';
import personalContext from '../../context/personal/personalContext';



const Personal = ({personal}) => {

    const personContext = useContext(personalContext);
    const {eliminarPersonal} = personContext;

    const handleDelete = () => {
        eliminarPersonal(personal);
    }
    return ( 
        <tr>
            <td>{personal.id_colaborador}</td>
            <td>{personal.nombre}</td>
            <td>{personal.apellido_paterno}</td>
            <td>{personal.telefono}</td>
            <td>{personal.email}</td>
            <td>{personal.direccion}</td>
            <td><button className="btn btn-info"><i className="fa fa-pencil"></i></button>
            <button className="btn btn-danger" onClick={()=> handleDelete()}><i className="fa fa-ban"></i></button></td>
        </tr>
     );
}
 
export default Personal;