import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return(
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <img src="/img/pesa.jpg"   className="d-inline-block align-top" />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mr-3">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="actionClientes" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Clientes    
                                </a>
                                <div className="dropdown-menu" aria-labelledby="actionClientes">
                                <Link className="dropdown-item" to={"/clientes"}>Listar Clientes</Link>
                                <Link className="dropdown-item" to={"/form-cliente"}>Añadir Clientes</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="actionClientes" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Entrenadores
                                </a>
                                <div className="dropdown-menu" aria-labelledby="actionEntrenadores">
                                <Link className="dropdown-item" to={"/personal"}> Listar Entrenadores</Link>
                                <Link className="dropdown-item" to={"/form-personal"}>   Añadir Entrenadores</Link>
                                </div>
                             </li>
                             <li className="nav-item">
                                <Link className="nav-link text-white" to={"/actividades"}>Entrenamientos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to={"/contactenos"}>Contactenos</Link>
                            </li>    
                        </ul>
                    </div>    
                </nav>
            </div>
    )
}

export default Header;