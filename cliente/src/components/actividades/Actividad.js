import React, {useContext,Fragment} from 'react';
import actividadContext from '../../context/actividades/actividadesContext';
import ListadoClases from '../clases/ListadoClases';
const Actividad = () => {

    const actividadesContext = useContext(actividadContext);
    const {actividadActual, clasesActividad} = actividadesContext;

    return (
        <Fragment> 
                {actividadActual? (
                    <div>
                    <div className="row">
                        <div className="col">
                            <p>{actividadActual.descripcion}</p>
                            <p>{actividadActual.nombre}</p>
                            <p>Desde actividad</p>
                            <p>Desde actividad</p>
                        </div> 
                        <div className="col">
                            <figure>
                                <img src={`img/${actividadActual.imagenRef}.jpg`} alt={actividadActual.nombre} />
                                <figcaption>
                                    {actividadActual.nombre}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="row">
                       <ListadoClases clases = {clasesActividad} />
                        
                    </div>
                </div>
                ): <p>loading</p>}
        </Fragment>
    );
}
 
export default Actividad;