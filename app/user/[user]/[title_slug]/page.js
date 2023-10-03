import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote/rsc'

import Comment from '@/app/components/Comment'
import DisplayConent from '@/app/components/DisplayContent'

export default async function Page({ params: { user, title_slug } }) {

  
    const res = await fetch(`http://localhost:8090/api/public/blog/${user}/${title_slug}`, {
        cache: "no-store"
    })
    
    const data = await res.json()
  
    let { blog } = data

    return (
        <div className="container mt-6 content">
            <h1> 
                {blog.title}
            </h1>
            <h4>
                Author: {blog.author.name}
            </h4>
            <h6>
                Published: {new Date(blog.created_at).toLocaleDateString()}
            </h6>
            <h6>
                Updated: {new Date(blog.updated_at).toLocaleDateString()} {new Date(blog.updated_at).toLocaleTimeString()}
            </h6>
            <hr/>

            

            <MDXRemote
            source={blog.body}
            />
            
            <h1> Comments </h1>
            <Comment blog_id = {blog.id} author={blog.author.name} title_slug={title_slug}/>
        </div>
    )
}