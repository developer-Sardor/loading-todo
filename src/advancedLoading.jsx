import { useEffect, useState } from 'react'
import loadingImg from "./assets/loadingimg.png"
import styled from 'styled-components'
import { Input } from '@mui/material'

const AdvancedLoadingComp = () => {
  const [users, setUsers]= useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchUsers = async()=>{
    try {
      setLoading(true)
      const res = await fetch("https://jsonplaceholder.typicode.com/users")
      if(!res.ok){
        throw new Error("Failed to fetch API")
      }
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err.message) || "Something went wrong"
    }finally{
      setLoading(false)
    }
  }
  fetchUsers()
    },[])

    const filteredUsers = users.filter((user)=>{
      const keyword = search.toLowerCase()
      return user.name.toLowerCase().includes(keyword) ||
      user.username.toLowerCase().includes(keyword)
    
    })
  return (
    <div>
        <H1>Users List</H1>
        <Input type="text" placeholder='search users...' value={search} onChange={(e)=> setSearch(e.target.value)} />
        {loading && <img src={loadingImg} alt='loading...'/>}

        {filteredUsers.map((user, index)=>{
          return(
            <Card key={index}>
                <p>{user.name}</p>
                <p>{user.username}</p>
                <p>{user.phone}</p>
                <p>{user.email}</p>
                <p>{user.website}</p>
            </Card>
          )
        })}
    </div>
  )
}

export default AdvancedLoadingComp

export const Card = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 10px;
`
export const H1 = styled.h1`
  text-align: center;

`