import React, { useContext, useEffect, Fragment } from 'react';
import PersonalContext from '../../context/personal/personalContext';
import ListadoClases from '../clases/ListadoClases';
const PersonalDetalle = ({personal}) => {
  
  const personalContext = useContext(PersonalContext);
  const {actividades, personalActual, clasesTrainer} = personalContext;

  const nacimiento = new Date(personalActual.fecha_nacimiento);
  const registro = new Date(personalActual.fecha_alta);
  return ( 
      <div>
        {personalActual ? 
          (
            <Fragment>
              <p>ID : {personalActual.id_cliente}</p>
              <p>NOMBRE: {personalActual.nombre}</p>
              <p>APELLIDO PATERNO: {personalActual.apellido_paterno}</p>
              <p>APELLIDO MATERNO{personalActual.apellido_materno}</p>
              <p>EMAIL: {personalActual.email}</p>
              <p>TELEFONO: {personalActual.telefono}</p>
              <p>FECHA NACIMIENTO: {nacimiento}</p>
              <p>FECHA REGISTRO: {registro}</p>
              <p>DIRECCION: {personalActual.direccion}</p>
              <p>CATEGORIA: {personalActual.categoria}</p>
              <hr />
              <ListadoClases key= {personal.id_colaborador} clases = {clasesTrainer}/>
          </Fragment>)
        : <p>Loading</p>}
        
      </div>
     );
}
 
export default PersonalDetalle;