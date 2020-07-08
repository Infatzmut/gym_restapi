import React, {useContext,Fragment} from 'react';
import actividadContext from '../../context/actividades/actividadesContext';
import Clase from '../clases/Clase';
import ListadoClases from '../clases/ListadoClases';
const Actividad = () => {

    const actividadesContext = useContext(actividadContext);
    const {actividadActual, clasesActividad} = actividadesContext;

    
    return (
        <Fragment> 
                <div>
                    <div className="row">
                        <div className="col">
                            <p>{actividadActual[0].descripcion}</p>
                            <p>{actividadActual[0].nombre}</p>
                            <p>Desde actividad</p>
                            <p>Desde actividad</p>
                        </div> 
                        <div className="col">
                            <figure>
                                <img src="" alt={actividadActual[0].nombre} />
                                <figcaption>
                                    {actividadActual[0].nombre}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="row">
                       <ListadoClases clases = {clasesActividad} />
                        
                    </div>
                </div>
        </Fragment>
    );
}
 
export default Actividad;