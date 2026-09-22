import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

function NavbarJefe() {
    return (
        <header className="header-principal navbar navbar-expand-lg">
            <div className="container-fluid container-header">
                <div className="logo-marca-wrapper d-flex align-items-center">
                    <img src={logo} alt="Logo Taller" className="logo-header me-2" />
                    <h1 className="marca m-0">TALLER DE BETANCOURT</h1>
                </div>

                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <nav className="collapse navbar-collapse navegar" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/Inicio'>Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/Pedidos'>Pedidos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/ProveedoresGestion'>Gestión De Proveedores</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/Facturas'>Facturas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/Calificaciones'>Calificaciones</NavLink>
                        </li>

                        <li className="nav-item ms-2">
                            <button className="btn btn-login-nav" onClick={() => {
                                localStorage.removeItem("userRole"); // 1. Borra la sesión guardada
                                window.location.href = "/";          // 2. Te manda de regreso al inicio/login
                            }}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavbarJefe;