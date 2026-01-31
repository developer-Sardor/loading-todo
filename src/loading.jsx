import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

const LoadingComp = () => {
    const [users, setUsers] = useState([])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json().then(setUsers))
  })
  return (
    <div>
        {users.map((user, index)=>{
            return(
                <Cart key={index}>
                    <Link to={"/loading/${user.id}"}>
                    <p>{user.name}</p>
                    <p>{user.username}</p>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                    <p>{user.website}</p>
                    </Link>
                </Cart>
            )
        })}
    </div>
  )
}

export default LoadingComp

export const Cart = styled.div`
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 10px;
`