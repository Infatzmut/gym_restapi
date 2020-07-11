import React from 'react';
import Clase from './Clase';
import '../styles/ListadoClases.css';
const ListadoClases = ({clases}) => {
    
    if(!clases || clases.length === 0) {
        return (
            <div className="none-class">
               <h2 className="none-class-title">No hay clases Registradas</h2> 
            </div>
        )
    }
    return ( 
        <div className="container">
            <div className="container-title">
                <h2>Clases Actuales</h2>
            </div>
            <div className="d-flex flex-row">
                {clases.map(clase => (
                    <Clase key={clase.id_detalle_actividad} clase ={clase} />
                ))}
            </div>
        </div>
     );
}
 
export default ListadoClases;