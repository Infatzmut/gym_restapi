import React from 'react';
import Clase from './Clase';
const ListadoClases = ({clases}) => {
    
    if(!clases) {
        return (
            <div>
               <h2>No hay clases Registradas</h2> 
            </div>
        )
    }
    return ( 
        <div className="container">
            <div>
                <h2>Clases Actuales</h2>
            </div>
            <div>
                {clases.map(clase => (
                    <Clase key={clase.id_detalle_actividad} clase = {clase} />
                ))}
            </div>
        </div>
     );
}
 
export default ListadoClases;