import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Conta from './pages/Conta/Conta'
import Estoque from './pages/Estoque/Estoque'
import Pedidos from './pages/Pedidos/Pedidos'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/conta" element={<Conta/>}/>
        <Route path="/estoque" element={<Estoque/>}/>
        <Route path="/pedidos" element={<Pedidos/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
