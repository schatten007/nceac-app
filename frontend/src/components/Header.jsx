import React from 'react'
import { FaUser } from 'react-icons/fa';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';

function Header({ currentUser, setCurrentUser }) {

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('token');
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>DEV BUILD</Link>
            </div>
            <ul>
                <li>{
                    (!currentUser) ? 
                    <Link to='/login'>
                        <GoSignIn /> Login
                    </Link>
                    :
                    <Link to='/login' onClick={logout}>
                        <GoSignOut /> Logout
                    </Link>
                    }
                </li>
                <li>{
                    (!currentUser) ?
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link> :
                    <Link to='/'>
                    <FaUser /> {currentUser.name}
                    </Link>
                    }
                </li>
            </ul>
        </header>
    );
}

export default Header