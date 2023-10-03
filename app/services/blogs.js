const base_url = "http://localhost:8090"

export const latest_blogs = async () =>{
    const res = await fetch(`${base_url}/api/blogs`)
    const blogs = res.json();
    return blogs;
}
