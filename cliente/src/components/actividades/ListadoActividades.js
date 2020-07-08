import React, { useContext, useEffect } from 'react';
import actividadContext from '../../context/actividades/actividadesContext';
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
        <div class="header-section header-section_padding-top-bottom text-center">
            <h1 class="header-section__title header-section__title_sm">Lista de Entrenamientos</h1>
        </div>
         <div class="columns columns_multiline columns_no-gutter">
            {actividades ? 
                actividades.map(actividad => (
                    <div class="col col_6 col_4-desktop-md col_3-desktop-xl">
                        <Link to={"/actividades-descripcion"} class="border-box" href="" onClick={() =>{
                                    
                                    obtenerActividad(actividad.id_actividad)}} >
                            <figure class="border-box__img-container lazy-container-image ">
                                <img class="border-box__img" src={`img/${actividad.imagenRef}.jpg`} alt={`${actividad.nombre}`} data-object-fit="cover" />
                            </figure>
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