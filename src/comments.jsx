import React, { useEffect, useState } from 'react'
import { Card, H1 } from './advancedLoading'
import loadingImg from "./assets/loadingimg.png"
import styled from 'styled-components'
import { Input } from './todo'

const CommentsComp = () => {
    const [comments, setComments] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchComments = async()=>{
            try {
                setLoading(true)
                const res = await fetch("https://jsonplaceholder.typicode.com/comments")
                if(!res.ok){
                    throw new Error("Failde to fetch API")
                }
                const data = await res.json()
                setComments(data)
            } catch (err) {
                setError(err.message) || "Something went wrong"
            }finally{
                setLoading(false)
            }
        }
        fetchComments()
    }, [2000])

    const filteredComments = comments.filter((comment)=>{
        const keyword = search.toLowerCase()
        return(
            comment.name.toLowerCase().includes(keyword) ||
            comment.email.toLowerCase().includes(keyword) ||
            comment.body.toLowerCase().includes(keyword)
        )
    })
  return (
    <div>
        <H1>Comments List</H1>
        <div style={{display:"flex", justifyContent:"center"}}>
             <Input type="text" placeholder='search comment...' value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
       
        {loading && <img src={loadingImg} alt='loading...'/>}
        {filteredComments.length === 0 && (<h2>No comments found!</h2>)}

        {filteredComments.map((comment, index)=>{
            return(
                <Card key={index}>
                    <p>{comment.name}</p>
                    <p>{comment.body}</p>
                    <p>{comment.email}</p>
                    <p>{comment.postId}</p>
                </Card>
            )
        })}
    </div>
  )
}

export default CommentsComp