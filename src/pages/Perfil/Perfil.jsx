import { useState, useEffect, useRef } from 'react';


import { obterUsuarioPorToken, atualizarUsuario, deletarUsuario } from '../../hooks/usuarioAuthHook';
import { useNavigate } from 'react-router-dom';

import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './style.css';
import PropTypes from 'prop-types';


function PopupActions({title, textContent, redButtonText, greenButtonText, visibility, state}) {
    return (
        <section className={visibility ? 'conta__container__popup conta__container__popup--active' : 'conta__container__popup conta__container__popup--disable' }>
            <div className='popup__window'> 
                <div className='window__container__title'>
                    <h2 className='title__text'>{title}</h2>
                    <img src="./imgs/Conta/close_popup.svg" alt="Ícone de fechar janela" className='title__icon' onClick={() => state(e => !e)}/>
                </div>
                <div className='window__container__textContent'>
                    <p>{textContent}</p>
                </div>
                <div className='window__container__buttons'>
                    <button className='botoes__botaoDeletar' onClick={() => state(e => !e)}>{redButtonText}</button>
                    <button className='botoes__botaoSalvar'>{greenButtonText}</button>
                </div>
            </div>
        </section>
    )
}

const Perfil = () => {
    const [visibilityAtualizar, setVisibilityAtualizar] = useState(false)
    const [visibilityDeletar, setVisibilityDeletar] = useState(false)
    const [user, setUser] = useState(null);
    const initialized = useRef(false);
 
    const navigate = useNavigate()
    
    const me = async () => {
        const user = await obterUsuarioPorToken();
    
        if (user) {
            setUser(user)
            console.log(user)
        }
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const editUser = async () => {
		await atualizarUsuario(user._id, user);
        navigate('/home')
	}

    const deleteUser = async () => {
		await deletarUsuario(user._id, user);
        navigate('/');
	}

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            me();
        }
    }, [])
 
    return (
        <main className='conta__main'>
            <MenuLateral selecao="conta" adminName="Wilson Vendramel" />
            {user ? 
            
            <section className="container__conta">
            <div className='conta__titulo'>
                <h1>Perfil</h1>
            </div>
            <div className='conta__nomeAdmin'>
                <img src="./imgs/Conta/admin_photo.svg" alt="Foto perfil admin" />

                <p>{user.nome}</p>
            </div>

            <div className='conta__infomacoes'>
                <div className='informacoes__container__inputs'>
                    <div className='inputs__header'>
                        <label htmlFor="adminNome">Nome</label>
                        <input type="text" name="nome" id="adminNome" onChange={handleChange} value={user.nome} />
                    </div>
                    <div className='inputs__header'>
                        <label htmlFor="adminEmail">Email</label>
                        <input type="email" name="email" id="adminEmail" onChange={handleChange} value={user.email} />
                    </div>
                    <div className='inputs__header'>
                        <label htmlFor="adminSenha">Senha</label>
                        <input type="password" name="senha" id="adminSenha" onChange={handleChange}  />
                    </div>
                    <div className='inputs__header'>
                        <label htmlFor="adminConfirmaSenha">Confirmar senha</label>
                        <input type="password" name="confirmaSenha" onChange={handleChange} id="adminConfirmaSenha" />
                    </div>
                </div>
                <div className='informacoes__container__botoes'>
                    <button className='botoes__botaoDeletar' onClick={deleteUser}>Deletar conta</button>
                    <button className='botoes__botaoSalvar' onClick={editUser}>Salvar</button>
                </div>
            </div>
            </section> : <h1> Usuario não está logado</h1>
        }

            <PopupActions 
                title="Deletar Conta" 
                textContent="Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita" 
                redButtonText="Cancelar" 
                greenButtonText="Deletar"
                visibility={visibilityDeletar}
                state={setVisibilityDeletar}
                onclick={deleteUser}
            />

            <PopupActions 
                title="Atualizar conta" 
                textContent="Tem certeza que deseja atualizar suas informações?" 
                redButtonText="Cancelar" 
                greenButtonText="Atualizar" 
                visibility={visibilityAtualizar}
                state={setVisibilityAtualizar}
                onclick={editUser}
            />

        </main>
    )
}

PopupActions.propTypes = {
    title: PropTypes.string,
    textContent: PropTypes.string,
    redButtonText: PropTypes.string,
    greenButtonText: PropTypes.string,
    visibility: PropTypes.bool,
    state: PropTypes.func,
    onclick: PropTypes.func
};

export default Perfil