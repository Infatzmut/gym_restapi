import React, {useContext,Fragment} from 'react';
import actividadContext from '../../context/actividades/actividadesContext';
import '../styles/Actividades.css';
import ListadoClases from '../clases/ListadoClases';
const Actividad = () => {

    const actividadesContext = useContext(actividadContext);
    const {actividadActual, clasesActividad} = actividadesContext;

    return (
        <Fragment> 
                {actividadActual? (
                    <div className="container">
                    <div className="row text-container">
                        <div className="col">
                            <p className="title-activity">{actividadActual.nombre}</p>
                            <p className="description-activity ">{actividadActual.descripcion}</p>
                            <hr></hr>
                            <h3>Beneficios: </h3>
                            <ul>
                                {actividadActual.beneficios.map(beneficio => (
                                    <li>{beneficio.descripcion}</li>
                                ))}    
                            </ul>
                        </div> 
                        <div className="col activity-image">
                            <figure>
                                <img src={`img/${actividadActual.imagenRef}.jpg`} alt={actividadActual.nombre} />
                                <figcaption>
                                    {actividadActual.imagenRef}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="row list-class-activities">
                       <ListadoClases clases = {clasesActividad} />
                    </div>
                </div>
                ): <p>loading</p>}
        </Fragment>
    );
}
 
export default Actividad;