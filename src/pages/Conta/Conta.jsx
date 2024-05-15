import { useState } from 'react';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './style.css';
import PropTypes from 'prop-types';

function PopupActions({title, textContent, redButtonText, greenButtonText, visibility, state}) {
    return (
        <section className={visibility ? 'conta__container__popup conta__container__popup--active' : 'conta__container__popup conta__container__popup--disable' }>
            <div className='popup__window'> 
                <div className='window__container__title'>
                    <h2 className='title__text'>{title}</h2>
                    <img src="../../public/imgs/Conta/close_popup.svg" alt="Ícone de fechar janela" className='title__icon' onClick={() => state(e => !e)}/>
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

const Conta = () => {
    const [visibilityAtualizar, setVisibilityAtualizar] = useState(false)
    const [visibilityDeletar, setVisibilityDeletar] = useState(false)

    return (
        <main className='conta__main'>
            <MenuLateral selecao="conta" adminName="Wilson Vendramel" />
            <section className="container__conta">
                <div className='conta__titulo'>
                    <h1>Conta</h1>
                </div>
                <div className='conta__nomeAdmin'>
                    <img src="../../public/imgs/Conta/admin_photo.svg" alt="Foto perfil admin" />

                    <p>Wilson Vendramel</p>
                </div>

                <div className='conta__infomacoes'>
                    <div className='informacoes__container__inputs'>
                        <div className='inputs__header'>
                            <label htmlFor="adminNome">Nome</label>
                            <input type="text" name="Nome" id="adminNome" />
                        </div>
                        <div className='inputs__header'>
                            <label htmlFor="adminEmail">Email</label>
                            <input type="email" name="Email" id="adminEmail" />
                        </div>
                        <div className='inputs__header'>
                            <label htmlFor="adminSenha">Senha</label>
                            <input type="password" name="Senha" id="adminSenha" />
                        </div>
                        <div className='inputs__header'>
                            <label htmlFor="adminConfirmaSenha">Confirmar senha</label>
                            <input type="password" name="Confirma senha" id="adminConfirmaSenha" />
                        </div>
                    </div>
                    <div className='informacoes__container__botoes'>
                        <button className='botoes__botaoDeletar' onClick={() => setVisibilityDeletar(e => !e)}>Deletar conta</button>
                        <button className='botoes__botaoSalvar' onClick={() => setVisibilityAtualizar(e => !e)}>Salvar</button>
                    </div>
                </div>
            </section>

            <PopupActions 
                title="Deletar Conta" 
                textContent="Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita" 
                redButtonText="Cancelar" 
                greenButtonText="Deletar"
                visibility={visibilityDeletar}
                state={setVisibilityDeletar}
            />

            <PopupActions 
                title="Atualizar conta" 
                textContent="Tem certeza que deseja atualizar suas informações?" 
                redButtonText="Cancelar" 
                greenButtonText="Atualizar" 
                visibility={visibilityAtualizar}
                state={setVisibilityAtualizar}
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
};

export default Conta