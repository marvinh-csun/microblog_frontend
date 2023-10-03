
import Link from "next/link";

export default async function Page({ params: { id } }) {

  const page_id = id ? id : 1;

  const res = await fetch(`http://localhost:8090/api/public/blog?page=${page_id}`, {
    cache: "no-store"
  })
  
  const data = await res.json()

  console.log(data);

  let {total, page} = data

  return (
  <div className='container content mt-6'>
    <h1 className='mt-6'> COMP 584 Microblog </h1>
    {
    page.data.map((post,index) => (
      <div key={index}>
        <div className='columns mt-6' style={{top: "2rem"}} key={index}>
          <div className='column is-one-fifth'>
            <p> Author: <Link href={`/user/${post.author.name}`}> {post.author.name}</Link> </p>
            <p> Published: {new Date(post.created_at).toLocaleDateString()} </p>
          </div>
          <div className='column'>
            <h2> {post.title} </h2>
            <p> {post.description} </p>
            <Link href={`/user/${post.author.name}/${post.slug}`} className="button is-dark"> View Blog </Link>
          </div>
        </div>
        <hr/>
      </div>
    ))
    }

    <div className='m-4 is-flex is-justify-content-space-between' style={{position: "sticky", bottom: "1rem"}}>

      {
        page.current_page > 1 ?
          <a className='button is-primary' href={`/${page.current_page-1}`}> Previous </a>
        :
        <>
        </>
      }
      {
        page.next_page_url ?
          <a className='button is-primary' href={`/${page.current_page+1}`}> Next </a>
        :
        <>
        </>
      }
      
    </div>
  </div>
  )
}