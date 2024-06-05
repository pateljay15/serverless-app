import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import "./Nav.css"
import { getAuthenticationToken, removeAuthToken } from '../lambda-calls/LambdaCalls';

function Nav() {
    const setActiveLink = ({ isActive }: { isActive: boolean }): string => isActive ? 'active link' : 'link';

    const auth = getAuthenticationToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeAuthToken();
        navigate('/signup');
    };

    return (
        <nav>
            <div className="navbar-brand">
                <a href="/">LetsSocial</a>
            </div>
            <div className="navbar-links">
                {auth !== null && <li><a href="/">Home</a></li>}
                {auth == null && <li><a href="/signup">Signup</a></li>}
                {auth !== null ? (
                    <>
                        <span className="auth" onClick={handleLogout}>Logout</span>
                    </>
                ) : (
                    <>
                        <NavLink style={{ textDecoration: 'none' }} to="/login">
                            <span className="auth">Login</span>
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
