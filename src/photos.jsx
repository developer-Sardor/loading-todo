import { useEffect, useState } from 'react'
import loadingImg from "./assets/loadingimg.png"
import { Card, H1 } from './advancedLoading'
import { Input } from '@mui/material'

const PhotosComp = () => {
    const [photos, setPhotos] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchPhotos = async()=>{
            try {
                setLoading(true)
                const res = await fetch("https://jsonplaceholder.typicode.com/photos")
                if(!res.ok){
                    throw new Error("Failed to fetch photos")
                }
                const data = await res.json()
                setPhotos(data)
            } catch (err) {
                setError(err.message) || "Something went wrong"
            }finally{
                setLoading(false)
            }
        }
        fetchPhotos()
    },[])
    const filteredPhotos = photos.filter((photo)=>{
        const keyword = search.toLowerCase()
        return(
            photo.title.toLowerCase().includes(keyword) ||
            photo.url.toLowerCase().includes(keyword)
        )
    })
  return (
    <div style={{padding:"5px 20px"}}>
        <H1>Photos List</H1>
        <div style={{display:"flex", justifyContent:"center"}}>
            <Input type="text" placeholder='search photos...' value={search} onChange={(e)=> setSearch(e.target.value)} />
        </div>
        
        {loading && <img src={loadingImg} alt='loading...'/>}
        {filteredPhotos.length === 0 &&(<h2>No photos found</h2>)}

        {filteredPhotos.map((photo, index)=>{
            return(
                <Card key={index}>
                    <p>{photo.albumId}</p>
                    <p>{photo.id}</p>                
                    <p>{photo.title}</p>
                    <p>{photo.url}</p>
                </Card>
            )
        })}
    </div>
  )
}

export default PhotosComp