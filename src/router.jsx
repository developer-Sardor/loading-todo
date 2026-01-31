import DetailComp from './detail'
import { Route, Routes } from 'react-router'
import LoadingComp from './loading'
import AdvancedLoadingComp from './advancedLoading'
import TodoComp from './todo'
import PhotosComp from './photos'
import AlbumsComp from './albums'
import CommentsComp from './comments'
import PostsComp from './posts'

const RouterComp = () => {
  return (
    <div>
        <DetailComp/>
        <Routes>
          <Route path='/' element={<PhotosComp/>}/>
            <Route path='/loading' element={<LoadingComp/>}/>
            <Route path='/loading/:id' element={<DetailComp/>}/>
            <Route path='/advance' element={<AdvancedLoadingComp/>}/>
            <Route path='/todo' element={<TodoComp/>}/>
            <Route path='photos' element={<PhotosComp/>}/>
            <Route path='/albums' element={<AlbumsComp/>}/>
            <Route path='/comments' element={<CommentsComp/>}/>
            <Route path='/posts' element={<PostsComp/>}/>
        </Routes>
    </div>
  )
}

export default RouterComp