import React, { useEffect, useState } from 'react'
import { Card, H1 } from './advancedLoading'
import { Input } from './todo'
import loadingImg from "./assets/loadingimg.png"

const PostsComp = () => {

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchPosts = async()=>{
            try {
                setLoading(true)
                const res = await fetch("https://jsonplaceholder.typicode.com/posts")
                if(!res.ok){
                    throw new Error("Failed to fetch API")
                }
                const data = res.json()
                setPosts(data)
            } catch (err) {
                setError(err.message) || "Something went wrong"
            }finally{
                setLoading(false)
            }
        }
        fetchPosts()
    }, [3000])

    const filteredPosts = posts.filter((post)=>{
        const keyword = search.toLowerCase()
        return(
            post.title.toLowerCase().includes(keyword) ||
            post.body.toLowerCase().includes(keyword) ||
            post.id.toLowerCase().includes(keyword)
        )
    })
  return (
    <div>
        <H1>Posts List</H1>
        <Input type='text' placeholder='search post...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        {loading && <img src={loadingImg} alt='loading...'/>}
        {filteredPosts.length === 0 && (<h2>No posts found</h2>)}
        {filteredPosts.map((post, index)=>{
            return(
                <Card key={index}>
                    <p>{post.userId}</p>
                    <p>{post.id}</p>
                    <p>{post.body}</p>
                    <p>{post.title}</p>
                </Card>
            )
        })}
    </div>
  )
}

export default PostsComp