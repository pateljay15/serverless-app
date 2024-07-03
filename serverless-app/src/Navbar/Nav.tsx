import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import { getAuthenticationToken, removeAuthToken } from '../lambda-calls/LambdaCalls';

function Nav() {
    const setActiveLink = ({ isActive }: { isActive: boolean }): string => isActive ? 'active link' : 'link';

    const auth = getAuthenticationToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeAuthToken();
        navigate('/');
    };

    return (
        <nav>
            <div className="navbar-brand">
                <NavLink to="/">LetsSocial</NavLink>
            </div>
            <ul className="navbar-links">
                {auth && <li><NavLink to="/home" className={setActiveLink}>Home</NavLink></li>}
                {auth && <li><NavLink to="/profile" className={setActiveLink}>Profile</NavLink></li>}
                {auth == null && <li><NavLink to="/" className={setActiveLink}>Signup</NavLink></li>}
                {auth !== null ? (
                    <li><span className="auth" onClick={handleLogout}>Logout</span></li>
                ) : (
                    <li><NavLink to="/login" className={setActiveLink}>Login</NavLink></li>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
