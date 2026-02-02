import loadingImg from "./assets/loadingimg.png"
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
// ||
const TodoComp = () => {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState("all")
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchTodo = async()=>{
            try {
                setLoading(true)
                const res = await fetch("https://jsonplaceholder.typicode.com/todos")
                if(!res.ok){
                    throw new Error("Failed to fetch user api")
                }
                const data = await res.json()
                setTodos(data)
            } catch (error) {
                console.error("Failed to fetch todos", error)
            }finally{
                setLoading(false)
            }
        }
        fetchTodo()
    },[])

    const filteredTodo = todos.filter((todo)=>{
        if(filter === "completed")return todo.completed;
        if(filter === "incompleted") return !todo.completed;
        return "all"
    })

  return (
        <div style={{padding:"20px"}}>
            <Button onClick={()=>setFilter("all")} variant="text" sx={{margin:"0px 10px"}}>All</Button>
            <Button onClick={()=>setFilter("completed")} variant="contained" sx={{margin:"0px 10px"}}>Completed</Button>
            <Button onClick={()=>setFilter("incompleted")} variant="outlined" sx={{margin:"0px 10px"}}>Not Completed</Button> 
            {loading && <img src={loadingImg}/>}
        {filteredTodo.map((todo, index)=>{
                return(
                    <div key={todo.id}>
                        <span>{index}</span>
                        <p style={{marginLeft:"5px"}}>{todo.title}</p>
                    </div>
                    
                )
            })}
        </div>
  )
}

export default TodoComp


