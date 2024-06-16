import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import getState from '../../config/state';
import { setToken, setUserId } from '../../config/auth';
import { login } from '../../hooks/usuarioHook';

import './style.css';

const Login = () => {
    const [user, setUser] = React.useState();

    const navigate = useNavigate();

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {

        const userLogin = await getState(setUser);
        const userResponse = await login(userLogin.email, userLogin.senha);
        
        if (userResponse) {
            const userId = userResponse.temAdmin[0]._id;
            setUserId(userId);
            setToken(userResponse.token);
            navigate('/conta');
        }
    };
    return (
        <main className='login__main'>
            <img src="./imgs/logo_qgelado.svg" alt="Logo QGelado" className='logo__topo' />
            <section className="logininer__login">
                <div className='login__titulo'>
                    <h1>Login</h1>
                </div>

                <div className='login__infomacoes'>
                    <div className='informacoes__login__inputs'>
                        <div className='inputs__header'>
                            <label htmlFor="adminEmail">Email</label>
                            <input type="email" name="email" id="adminEmail" placeholder="E-mail" onChange={handleChange} />
                        </div>
                        <div className='inputs__header'>
                            <label htmlFor="adminSenha">Senha</label>
                            <input type="password" placeholder='Senha' name="senha" id="adminSenha" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='informacoes__logininer__botoes'>
                        <button className='botoes__botaoLogin' onClick={handleSubmit}>Login</button>
                    </div>
                    <div className='informacoes__logininer__botoes'>
                        <h3>Não tem uma login? <RouterLink to="/cadastrar">Cadastre-se</RouterLink></h3>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Login;