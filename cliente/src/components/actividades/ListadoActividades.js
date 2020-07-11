import React, { useContext, useEffect } from 'react';
import actividadContext from '../../context/actividades/actividadesContext';
import {Link} from 'react-router-dom';
import '../styles/ListadoActividades.css'
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
         <div className="row">
            {actividades ? 
                actividades.map(actividad => (
                        <div className="activity-container">
                            <Link className="border-box" to={"/actividades-descripcion"}  
                                    onClick={() => {obtenerActividad(actividad.id_actividad)}}>
                                <div className="image">
                                    <img  src={`img/${actividad.imagenRef}.jpg`} data-object-fit="cover" alt="Card image cap"/>
                                </div>
                                <div className="border-box__info-container">
                                <h4 className="border-box__title">{actividad.nombre}</h4>
                                <h5 className="border-box__additional-info border-box__additional-info_gray border-box__additional-info_no-margin">{actividad.descripcion.substring(0,100)}</h5>
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