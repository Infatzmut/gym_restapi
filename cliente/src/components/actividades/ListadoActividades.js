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
        <div className="header-section header-section_padding-top-bottom text-center">
            <h1 className="header-section__title header-section__title_sm">Lista de Entrenamientos</h1>
        </div>
         <div className="columns columns_multiline columns_no-gutter">
            {actividades ? 
                actividades.map(actividad => (
                    <div key = {actividad.id_actividad} className="col col_6 col_4-desktop-md col_3-desktop-xl">
                        <Link to={"/actividades-descripcion"} className="border-box" href="" onClick={() =>{
                                    
                                    obtenerActividad(actividad.id_actividad)}} >
                            <figure className="border-box__img-container lazy-container-image ">
                                <img className="border-box__img" src={`img/${actividad.imagenRef}.jpg`} alt={`${actividad.nombre}`} data-object-fit="cover" />
                            </figure>
                            <div className="border-box__info-container">
                                <h4 className="border-box__title">{actividad.nombre}</h4>
                                <h5 className="border-box__additional-info border-box__additional-info_gray border-box__additional-info_no-margin">{actividad.descripcion.substring(0, 80)}...</h5>
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