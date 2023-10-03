"use client"
import React, { createContext, useState, useContext, useEffect } from 'react'
import  Cookies  from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch("http://localhost:8090/api/user",{
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('laravel_token')}`
                }
            })
            let data = await res.json();
            let {id} = data;
            if(!id) {
                setUser(p=>null);
            }else{
                setUser(p=>data);
            }
            setLoading(p=>false)
        }

        getUser();
        
    }, [])

    const login = async (email, password) => {
        const res = await fetch("http://localhost:8090/api/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        let {user, token} = await res.json();
        Cookies.set('laravel_token',token,{expires: 60});
        setUser(p=>user);
    }

    const logout = async () => {
        const res = await fetch("http://localhost:8090/api/logout",{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('laravel_token')}`
            }
        });
        await res.json()
        Cookies.remove('laravel_token');
        setUser(p=>null)
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading ,login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)