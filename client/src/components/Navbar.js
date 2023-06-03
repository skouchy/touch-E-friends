import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'
import {Button} from "./Button"

export default function Navbar() {
    const [click, setClick]=useState(false);
    const handleClick=()=>setClick(!click);
    const closeMobileMenu=()=>setClick(false);
    const [button, setButton]=useState(true);

    const showButton=()=>{
        if (window.innerWidth<=960){
            setButton(false);
        }else{
            setButton(true);
        }
    }
    useEffect(()=>{
        showButton();
    }, [])

    window.addEventListener('resize', showButton);
    return(
        <>
            <nav className="navbar">
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        Touch-E-Friends 
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times': 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active': 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/address' className='nav-links' onClick={closeMobileMenu}>
                                AddressBook
                            </Link>
                        </li>
                        <li>
                            <Link to='/imagesearch' className='nav-links' onClick={closeMobileMenu}>
                                Image Search
                            </Link>
                        </li>
                    </ul>
                    {button && (
                        <Button buttonStyle='btn--outline'>
                            <Link to='/login' className='nav-links'>
                                Log In
                            </Link>
                        </Button>
                    )}
                    {button && (
                        <Button buttonStyle='btn--outline'>
                            <Link to='/signup' className='nav-links'>
                                Sign Up
                            </Link>
                        </Button>
                    )}

                    
                </div>
            </nav>
        </>
    )
}

            
