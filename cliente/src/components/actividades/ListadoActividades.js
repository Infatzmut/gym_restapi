import React, { useContext, useEffect } from 'react';
import actividadContext from '../../context/actividades/actividadesContext';
import '../styles/ListadoActividades.css';
import {Link} from 'react-router-dom';
const ListadoActividades = () => {
    
    const actividadesContext = useContext(actividadContext);
    const {actividades, obtenerActividades, obtenerActividadActual, obtenerClasesActividad} = actividadesContext;


    useEffect(() => {
        obtenerActividades()
    }, [])
    
    const obtenerActividad = idActividad => {
        obtenerActividadActual(idActividad)
        obtenerClasesActividad(idActividad)
    }

    
    return ( 
        <div className="container">
        <div class="title-container">
            <h1 class="title">Lista de Entrenamientos</h1>
        </div>
         <div class="columns columns_multiline columns_no-gutter directions">
            {actividades ? 
                actividades.map(actividad => (
                    <div class="activity-container">
                        <Link to={"/actividades-descripcion"} class="border-box" href="" onClick={() =>{
                                    
                                    obtenerActividad(actividad.id_actividad)}} >
                            <div class="image">
                                <img src={`img/${actividad.imagenRef}.jpg`} alt={`${actividad.nombre}`} data-object-fit="cover" />
                            </div>
                            <div class="border-box__info-container">
                                <h4 class="border-box__title">{actividad.nombre}</h4>
                                <h5 class="border-box__additional-info border-box__additional-info_gray border-box__additional-info_no-margin">{actividad.descripcion.substring(0, 80)}...</h5>
                            </div>
                        </Link>
                    </div>
                    ))
                : <p>Loading</p>}            
        </div> 
        </div>
     );
}
 
export default ListadoActividades;