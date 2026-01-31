import { useEffect, useState } from 'react'
import { Card, H1 } from './advancedLoading'
import loadingImg from "./assets/loadingimg.png"

const AlbumsComp = () => {

        const [albums, setAlbums] = useState([])
        const [search, setSearch] = useState("")
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)

        useEffect(()=>{
            const fetchAlbums = async()=>{
                try {
                    setLoading(true)
                    const res = await fetch("https://jsonplaceholder.typicode.com/albums")
                    if(!res.ok){
                        throw new Error("Failed to fetch API")
                    }
                    const data = res.json()
                    setAlbums(data)
                } catch (err) {
                    setError(err.message) || "Something went wrong"
                }finally{
                    setLoading(false)
                }
            }
            fetchAlbums()
        }, [])

       const filteredAlbums = albums.filter(album=>{
        const keyword = search.toLowerCase()
        return(
            album.id.toLowerCase().includes(keyword) ||
            album.userId.toLowerCase().includes(keyword) ||
            album.title.toLowerCase().includes(keyword)
        )
       })
  return (
    <div>
        <H1>Albums List</H1>
        <input type="text" placeholder='search albums...' value={search} onChange={(e)=> setSearch(e.target.value)} />
        {loading && <img src={loadingImg} alt='loading...'/>}
        {filteredAlbums.length === 0 && (<h2>No albums found!</h2>)}

        {filteredAlbums.map((album, index)=>{
            return(
                <Card key={index}>
                    <p>{album.id}</p>
                    <p>{album.userId}</p>
                    <p>{album.title}</p>
                </Card>
            )
        })}
    </div>
  )
}

export default AlbumsComp