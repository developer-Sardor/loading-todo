import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import RouterComp from './router.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <RouterComp/>
    </BrowserRouter>

)
