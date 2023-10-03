"use client"
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import  Cookies  from 'js-cookie';

const CommentReply = (props) => {
    return (
        <Formik
            initialValues={{ parent_id: props.parent_id, comment: '' }}
            validationSchema={
                Yup.object({
                    comment: Yup.string().required("please provide a valid comment")
                })}

            onSubmit={(values, actions) => {
                props.handleSubmit(values, actions)
            }}
        >

            <Form noValidate>
                <div className="field">
                    <label className="label">In Reply To: {props.author}</label>
                    <div className="control has-icons-left has-icons-right">
                        <Field className="textarea" component="textarea" type="text" placeholder="Your Comment" name="comment" />
                    </div>
                    <ErrorMessage name="real_email">{msg => <p className="help is-danger">{msg}</p>}</ErrorMessage>
                </div>
                <button className="button" type="submit"> Submit Reply </button>
            </Form>
        </Formik>
    )
}

const Comment = (props) => {

    const { user } = useAuth()

    const [
        commentState,
        setCommentState
    ] = useState({
        comments: [],
        hasMoreComments: false,
        commentPage: 1
    })
    const [replyId, setReplyId] = useState(null)

    const fetchComments = async () => {
        const res = await fetch(`http://localhost:8090/api/public/blog/${props.author}/${props.title_slug}/comments?page=${commentState.commentPage}`)
        const data = await res.json()
        setCommentState(p => {
        return {
            ...p,
            comments: p.comments.concat(data.page.data),
            hasMoreComments: data.page.next_page_url != null,
        }})
    }

    useEffect(() => {
        fetchComments();
    }, [commentState.commentPage,commentState.comments.length > 0])

    const submitReply = async (values, actions) => {
        const res = await fetch(`http://localhost:8090/api/blog/${props.blog_id}/comments`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('laravel_token')}`
            },
            body: JSON.stringify({
                blog_id: props.blog_id,
                parent_id: values.parent_id,
                comment: values.comment
            })
        })
        const data = await res.json()

        setCommentState(p => {
            return {
                ...p,
                comments: [],
                commentPage: 1,
                hasMoreComments: false
            }
        })

        setReplyId(p=>-1)

    }
    return (
        <div className='container content'>
            {
                commentState.comments.map((ele, index) => {
                    return (
                        <React.Fragment key={index}>
                        <div>
                            {
                                ele.parent_id != null ?
                                <div className='p-4 is-rounded has-background-grey-lighter'>
                                    <p>{ele.in_reply_to.comment} </p>
                                    <h5>{ele.in_reply_to.author.name}</h5>
                                </div>
                                :
                                <></>
                            }
                            {
                                ele.parent_id != null ?
                                <p>
                                    In Reply To: {ele.in_reply_to.author.name}
                                </p>
                                :
                                <>
                                </>
                            }
                            <p> {ele.comment} </p>
                            <h5>Author: {ele.author.name}</h5>
                            <button className='button is-secondary' onClick={()=>{
                                setReplyId(p=>ele.id);
                            }}> Reply </button>
                            <hr />
                        </div>

                        {
                            ele.id == replyId ?
                            <>
                            <button className='button is-danger'
                            onClick={() => {
                                setReplyId(p=>-1)
                            }}
                            > X </button>
                            <CommentReply className="m-4" author={ele.author.name} parent_id={ele.id} handleSubmit={submitReply} /> 
                            </>
                            :
                            <>
                            </>
                        }
                        </React.Fragment>


                    )
                })
            }
            {
                commentState.hasMoreComments ?
                    <div className='is-center'>
                        <button className='button is-primary' onClick={() => 
                        setCommentState(p => {
                            return {
                            ...p,
                            commentPage: p.commentPage+1
                        }})
                    }> View More </button>
                    </div>
                    :
                    <>
                    </>
            }

        </div>
    )
}
export default Comment;