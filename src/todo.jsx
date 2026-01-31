import React, { useEffect, useState } from 'react'
import loadingImg from "./assets/loadingimg.png"
import styled from 'styled-components'
import { Card, H1 } from './advancedLoading'
// ||
const TodoComp = () => {
    const [todos, setTodos]= useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchTodos = async()=>{
            try {
                setLoading(true)
                const res = await fetch("https://jsonplaceholder.typicode.com/todos")
                if(!res.ok){
                    throw new Error("Failed to fetch API")
                }
                const data = await res.json()
                setTodos(data)
            } catch (err) {
               setError(err.message)  || "Something went wrong"
            }finally{
                setLoading(false)
            }
        }
        fetchTodos()
    },[])

    const filteredTodos = todos.filter((todo)=>{
        const keyword = search.toLowerCase()
        return(
        todo.title.toLowerCase().includes(keyword)
    )
    })
  return (
    <div style={{padding:"5px 20px"}}>
        <H1>Todos List</H1>
        <div style={{display:"flex", justifyContent:"center"}}>
            <Input type="text" placeholder='search todo...' value={search} onChange={(e)=> setSearch(e.target.value)} />
        </div>
        
        {loading && <img src={loadingImg} alt='loading...'/>}
        {filteredTodos.length === 0 && (<h2>No todos found</h2>)}

        {filteredTodos.map((todo, index)=>{
            return(
                <Card key={index}>
                    <p>{todo.userId}</p>
                    <p>{todo.id}</p>
                    <p>{todo.title}</p>
                    <p>{todo.completed}</p>
                </Card>
            )
        })}
    </div>
  )
}

export default TodoComp

export const Input = styled.input`
    padding: 5px 15px;
    width: 400px;
    border-radius: 4px;
    cursor: pointer;
    padding-left: 10px;
    margin-bottom: 30px;
    margin-top: 30px;
`
