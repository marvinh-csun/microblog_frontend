"use client";
import * as React from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {

    const { user, login } = useAuth()
    const router = useRouter()

    const handle_login = (values,actions) => {
        login(values.real_email,values.real_password)
    }
    React.useEffect(() => {
        if(user) {
            router.push('/dashboard')
        }
    },[user])
    return (
        <main>
            <div className="m-6 columns is-mobile is-centered">
                <div className="column is-half">

                        <LoginForm 
                        handleSubmit={handle_login}
                        />
                    
                    
                </div>
            </div>
        </main>
    )
}