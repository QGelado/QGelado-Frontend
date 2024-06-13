import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import CadastroProdutos from "./pages/CadastroProdutos/CadastroProdutos"
import EditarProdutos from "./pages/EditarProdutos/EditarProdutos"
import Conta from './pages/Conta/Conta'
import Estoque from './pages/Estoque/Estoque'
import Relatorio from './pages/Relatorio/Relatorio'
import Pedidos from './pages/Pedidos/Pedidos'
import './App.css';
import Perfil from "./pages/Perfil/Perfil";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cadastrar" element={<Cadastro/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/cadastro-produto" element={<CadastroProdutos/>}/>
        <Route exact path="/editar-produto" element={<EditarProdutos/>}/>
        <Route path="/conta" element={<Conta/>}/>
        <Route path="/estoque" element={<Estoque/>}/>
        <Route path="/relatorio" element={<Relatorio/>}/>
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/pedidos" element={<Pedidos/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
