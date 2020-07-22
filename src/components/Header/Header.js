/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
       
        <header>
            <div className="banner-container">
                <h1>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                     Marvel quiz
                    </Link>
                </h1>
            </div>
        </header>
    )
}

export default Header
