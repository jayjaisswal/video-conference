import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  {BrowserRouter} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext.jsx';



createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthProvider>
     <BrowserRouter>
    <App />
     <Toaster />
    </BrowserRouter>
    </AuthProvider>
    
  </StrictMode>,
)
