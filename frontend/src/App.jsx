
import './App.css'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import toast, { Toaster } from 'react-hot-toast';
import VideoMeeting from './pages/VideoMeeting';
function App() {
  
  return (
    <div className=''>
      
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/auth' element={<Authentication/>} />
          <Route path='/:url' element={<VideoMeeting/>} />
        </Routes>
      
      
    </div>
  )
}

export default App
