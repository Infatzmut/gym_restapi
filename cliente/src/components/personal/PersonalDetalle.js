import React, { useContext, useEffect } from 'react';
import PersonalContext from '../../context/personal/personalContext';
const PersonalDetalle = () => {
  
  const personalContext = useContext(PersonalContext);
  const {personalActual} = clienteContext;
  
  return ( 
      <div>
        <p>{personalActual[0].id_colaborador}</p>
        <p>{personalActual[0].nombre}</p>
        <p>{personalActual[0].apellido_paterno}</p>
        <p>{personalActual[0].apellido_materno}</p>
        <p>{personalActual[0].email}</p>
        <p>{personalActual[0].telefono}</p>
        <p>{personalActual[0].fecha_nacimiento}</p>
        <p>{personalActual[0].nombre}</p>
        <p>{personalActual[0].id_colaborador}</p>
        <p>{personalActual[0].nombre}</p>
      </div>
     );
}
 
export default PersonalDetalle;