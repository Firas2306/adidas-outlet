import Head from "next/head";
import Image from "next/image";

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
                <div className="navbar-nav align-items-center ms-auto">
                    
                   
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            
                            <span className="d-none d-lg-inline-flex">Firas Serhan</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                            <a href="#" className="dropdown-item">My Profile</a>
                            <a href="#" className="dropdown-item">Settings</a>
                            <a href="#" className="dropdown-item">Log Out</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    );
}


export default NavBar;