"use client"
import * as React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Header = (props) => {

    const { user, loading, logout } = useAuth();


    return (
        <>
            <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" href="/">
                        Microblog
                    </Link>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>

                </div>


                {
                    !user ?
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-primary">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a href="/login" className="button is-light">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <button
                                        onClick={() => logout()}
                                        className="button is-light">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                }


            </nav>
            <div style={{ marginTop: "6rem" }}>
            </div>
        </>
    )
}

export default Header;