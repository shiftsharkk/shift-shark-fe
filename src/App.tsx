import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import Routes from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
