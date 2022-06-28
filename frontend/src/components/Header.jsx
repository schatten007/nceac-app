import React from 'react'
import { FaUser } from 'react-icons/fa';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'

function Header({ currentUser, setCurrentUser }) {

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('token');
    }

    return (
        <StyledHeader className='header'>
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
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 999;
    position: relative;

`

export default Header