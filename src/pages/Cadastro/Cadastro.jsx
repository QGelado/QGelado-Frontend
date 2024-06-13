import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import  { cadastrarUsuario } from '../../hooks/usuarioHook';
import './style.css';

const Cadastro = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value)
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (user) {
        await cadastrarUsuario(user);
        navigate('/perfil');
    }
  }

  return (
      <main className='cadastro__main'>
          <img src="../../public/imgs/logo_qgelado.svg" alt="Logo QGelado" className='logo__topo' />
          <section className="cadastroiner__cadastro">
              <div className='cadastro__titulo'>
                  <h1>Cadastre-se</h1>
              </div>

              <div className='cadastro__infomacoes'>
                  <div className='informacoes__cadastroiner__inputs'>
                      <div className='inputs__header'>
                          <label htmlFor="nome">Nome</label>
                          <input type="text" onChange={handleChange} name="nome" id="adminNome" />
                      </div>
                      <div className='inputs__header'>
                          <label htmlFor="email">Email</label>
                          <input type="email" onChange={handleChange} name="email" id="adminEmail" />
                      </div>
                      <div className='inputs__header'>
                          <label htmlFor="senha">Senha</label>
                          <input type="password" onChange={handleChange} name="senha" id="adminSenha" />
                      </div>
                      <div className='inputs__header'>
                            <label htmlFor="adminConfirmaSenha">Confirmar senha</label>
                            <input type="password" onChange={handleChange} name="adminConfirmaSenha" id="adminConfirmaSenha" />
                        </div>
                  </div>
                  <div className='informacoes__cadastroiner__botoes'>
                      <button className='botoes__botaoCadastro'onClick={handleSubmit}>Cadastrar</button>
                  </div>
  
                  <div className='informacoes__cadastroiner__botoes'>
                      <h3>Já tem uma cadastro?<RouterLink to="/"> Login</RouterLink></h3>
                  </div>
              </div>
          </section>

      </main>
  )
}

export default Cadastro;