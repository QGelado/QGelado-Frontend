import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import EditarAdmin from './pages/Editar-Admin/Editar-Admin'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/editar-admin" element={<EditarAdmin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
