import React, {useContext,Fragment} from 'react';
import actividadContext from '../../context/actividades/actividadesContext';
import Clase from '../clases/Clase';
import ListadoClases from '../clases/ListadoClases';
import '../styles/Actividades.css';
const Actividad = () => {

    const actividadesContext = useContext(actividadContext);
    const {actividadActual, clasesActividad} = actividadesContext;

    
    return (
        <Fragment> 
                <div className="container">
                    <div className="row text-container">
                        <div className="col">
                            <p className="title-activity">{actividadActual[0].nombre}</p>
                            <p className="description-activity ">{actividadActual[0].descripcion}</p>
                            <p>Desde actividad</p>
                            <p>Desde actividad</p>
                        </div> 
                        <div className="col activity-image">
                            <figure>
                                <img src="" alt={actividadActual[0].nombre} />
                                <figcaption>
                                    {actividadActual[0].nombre}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="row list-class-activities">
                       <ListadoClases clases = {clasesActividad} />
                        
                    </div>
                </div>
        </Fragment>
    );
}
 
export default Actividad;