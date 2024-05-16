import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import CadastroProdutos from "./pages/CadastroProdutos/CadastroProdutos"
import EditarProdutos from "./pages/EditarProdutos/EditarProdutos"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cadastro-produto" element={<CadastroProdutos/>}/>
        <Route exact path="/editar-produto" element={<EditarProdutos/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
