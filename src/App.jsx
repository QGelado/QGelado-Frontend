import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Conta from './pages/Conta/Conta'
import Estoque from './pages/Estoque/Estoque'
import Relatorio from './pages/Relatorio/Relatorio'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/conta" element={<Conta/>}/>
        <Route path="/estoque" element={<Estoque/>}/>
        <Route path="/relatorio" element={<Relatorio/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
