import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication'
import VideoMeeting from './pages/VideoMeeting'
import Home from './pages/Home'
import History from './pages/History'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/auth'
         element={
           <PublicRoute><Authentication /></PublicRoute>
         
         
         } />
        <Route path='/:url' element={<VideoMeeting />} /> {/* Guest access allowed */}

        {/* Protected Routes */}
        <Route 
          path='/home' 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/history' 
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App;
