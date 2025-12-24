import axios from 'axios';
import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'

function Posts() {
    const ob = useParams()
     const [posts,setPosts]= useState([])

     useEffect(()=>{
        async function getPosts() {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${ob.userId}`);
            setPosts(res.data)

            
        }
        getPosts()
     },[ob])

    return (
    <div>
        <h1>Posts</h1>
        {posts.map((post)=>(
            <ul key={post.id}>
                <li>{post.title}</li>
                <li>{post.body}</li>
            </ul>
        ))}

        <Link to={`/${ob.userId}`}>
         <button>
            Back
        </button>
        </Link>


    </div>
  )
  
}

export default Posts



