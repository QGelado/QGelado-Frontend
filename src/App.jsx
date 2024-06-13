import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Conta from './pages/Conta/Conta'
import Estoque from './pages/Estoque/Estoque'
import Relatorio from './pages/Relatorio/Relatorio'
import './App.css';
import Perfil from "./pages/Perfil/Perfil";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/cadastrar" element={<Cadastro/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/conta" element={<Conta/>}/>
<<<<<<< HEAD
        <Route path="/estoque" element={<Estoque/>}/>
        <Route path="/relatorio" element={<Relatorio/>}/>
=======
        <Route path="/perfil" element={<Perfil/>} />
>>>>>>> feature/login
      </Routes>
    </BrowserRouter>
  )
}

export default App
