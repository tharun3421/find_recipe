import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Homepage from './pages/Homepage'
import FavoritesPage from './pages/FavoritesPage'
import {Routes,Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/favorites' element={<FavoritesPage/>}/>
      </Routes>
    </div>
  )
}

export default App
