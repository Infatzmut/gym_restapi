import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import ListadoClientes from './components/clientes/ListadoClientes';
import ListadoPersonal from './components/personal/ListadoPersonal';
import ListadoActividades from './components/actividades/ListadoActividades';
import NuevoCliente from './components/clientes/NuevoCliente';
import NuevoPersonal from './components/personal/NuevoPersonal';
import Contacto from './components/layout/Contacto';
import ClienteDetalle from './components/clientes/ClienteDetalle';
import ClienteState from './context/clientes/clienteState';
import PersonalState from './context/personal/personalState';
import ActividadState from './context/actividades/actividadesState';
import Actividad from './components/actividades/Actividad';

function App() {
  return (
    <ClienteState>
      <PersonalState>
        <ActividadState>
            <Router>
              <Header/>
              <Switch>
                <Route exact path ="/" component={Main}/>
                <Route exact path ="/clientes" component={ListadoClientes}/>
                <Route exact path ="/personal" component={ListadoPersonal}/>
                <Route exact path ="/actividades" component={ListadoActividades}/>
                <Route exact path ="/actividades-descripcion" component={Actividad} />
                <Route exact path ="/form-cliente" component={NuevoCliente} />
                <Route exact path ="/form-personal" component={NuevoPersonal} />
                <Route exact path ="/detalle-cliente" component={ClienteDetalle} />
                <Route exact path ="/contactenos" component={Contacto} />
              </Switch>
            </Router>
        </ActividadState>
      </PersonalState>
    </ClienteState>
  );
}


export default App;
