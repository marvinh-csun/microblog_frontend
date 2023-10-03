"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as React from 'react'
import * as Yup from 'yup'
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
const LoginForm = (props) => {

    return (
        <Formik
            initialValues={{ real_email: '', real_password: '' }}
            validationSchema={
                Yup.object({
                real_email: Yup.string().email().required(),
                real_password: Yup.string().required("please provide a valid password")
            })}
            
            onSubmit={(values,actions)=>{
                props.handleSubmit(values,actions)
            }}
        >

            <Form noValidate>
                <input name="email" hidden/>
                <input name="password" hidden/>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <Field className="input" type="email" placeholder="Email" name="real_email" />
                    </div>
                    <ErrorMessage name="real_email">{msg=><p className="help is-danger">{msg}</p>}</ErrorMessage>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <Field className="input" type="password" placeholder="Password" name="real_password" />
                    </div>
                    <ErrorMessage name="real_password">{msg => <p className="help is-danger">{msg}</p>}</ErrorMessage>
                </div>
                <button className="button" type="submit"> Log In </button>
            </Form>
        </Formik>
    )
}

export default LoginForm;