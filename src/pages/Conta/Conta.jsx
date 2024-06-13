import { useState, useEffect } from 'react';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './style.css';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY1NDgwMDMsImV4cCI6MTcxNjYzNDQwM30.jzsib5OjsQeAsAdr_91MWlKrnEGU_t_KbNSEMb9fTBo";
const id = "66509150014aa10fb3990d5a";

function PopupActions({ title, textContent, redButtonText, greenButtonText, visibility, state, functionError, errorStatus, setErrorStatus, updateFunction }) {
    if (errorStatus == 'hide') {
        return (
            <section className={visibility ? 'conta__container__popup conta__container__popup--active' : 'conta__container__popup conta__container__popup--disable'}>
                <div className='popup__window'>
                    <div className='window__container__title'>
                        <h2 className='title__text'>{title}</h2>
                        <img src="../../public/imgs/Conta/close_popup.svg" alt="Ícone de fechar janela" className='title__icon' onClick={() => { state(e => !e); setErrorStatus('hide') }} />
                    </div>
                    <div className='window__container__textContent'>
                        <p>{textContent}</p>
                    </div>
                    <div className='window__container__buttons'>
                        <button className='botoes__botaoDeletar' onClick={() => { state(e => !e); setErrorStatus('hide') }}>{redButtonText}</button>
                        <button className='botoes__botaoSalvar' onClick={() => { functionError(title); state(e => !e) }}>{greenButtonText}</button>
                    </div>
                </div>
            </section>
        )
    } else if (errorStatus == 'showSucesso') {
        return (
            <section className={visibility ? 'conta__container__popup conta__container__popup--active' : 'conta__container__popup conta__container__popup--disable'}>
                <div className='popup__window'>
                    <div className='window__container__title'>
                        <h2 className='title__text'>{title}</h2>
                        <img src="../../public/imgs/Conta/close_popup.svg" alt="Ícone de fechar janela" className='title__icon' onClick={() => { state(e => !e); setErrorStatus('hide') }} />
                    </div>
                    <div className='window__container__textContent'>
                        <p>Dados atualizados com sucesso!</p>
                    </div>
                    <div className='window__container__buttons' style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <button className='botoes__botaoSalvar' onClick={() => { state(e => !e); setErrorStatus('hide') }}>OK</button>
                    </div>
                </div>
            </section>
        )
    } else if (errorStatus == 'showError') {
        return (
            <section className={visibility ? 'conta__container__popup conta__container__popup--active' : 'conta__container__popup conta__container__popup--disable'}>
                <div className='popup__window'>
                    <div className='window__container__title'>
                        <h2 className='title__text'>{title}</h2>
                        <img src="../../public/imgs/Conta/close_popup.svg" alt="Ícone de fechar janela" className='title__icon' onClick={() => { state(e => !e); setErrorStatus('hide') }} />
                    </div>
                    <div className='window__container__textContent'>
                        <p>Erro na requisição! Verifique os dados! </p>
                    </div>
                    <div className='window__container__buttons' style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <button className='botoes__botaoDeletar' onClick={() => { state(e => !e); setErrorStatus('hide') }}>OK</button>
                    </div>
                </div>
            </section>
        )
    }
}


const Conta = () => {
    const [visibilityAtualizar, setVisibilityAtualizar] = useState(false);
    const [visibilityDeletar, setVisibilityDeletar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("hide");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmar, setConfirmaSenha] = useState("");
    const navigate = useNavigate()
    
    function deleteAdmin() {
        Axios.delete(`http://localhost:3000/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setErrorMessage("showSucesso");
                setVisibilityDeletar(e => !e)
                navigate('/');
                return "Sucesso na requisicao"
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage("showError");
                setVisibilityDeletar(e => !e)
                return "Erro na requisicao"
            })
    }

    function updateAdmin(newData) {
        Axios.put(`http://localhost:3000/admin/${id}`, newData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setErrorMessage("showSucesso");
                setVisibilityAtualizar(e => !e)
                return "Sucesso na requisicao"
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage("showError");
                setVisibilityAtualizar(e => !e)
                return "Erro na requisicao"
            })
    }

    function isDataWrong(title) {

        if (title == "Deletar Conta") {
            deleteAdmin()
            return
        }


        if (nome == "" || email == "" || senha == "") {
            console.log("Preencha todos os atributos dos inputs!");
            setErrorMessage("showError");
            setVisibilityAtualizar(e => !e)
        } else if (senha !== senhaConfirmar) {
            console.log("As senhas estão diferentes!")
            setErrorMessage("showError");
            setVisibilityAtualizar(e => !e)
        } else {
            formatDataToUpdate()
        }
    }

    function formatDataToUpdate() {
        const obj = {
            'nome': nome,
            'email': email,
            'senha': senha
        }
        updateAdmin(obj)
    }

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
                            <input type="text" name="Nome" id="adminNome" value={nome} onChange={e => { setNome(e.target.value) }} />
                        </div>
                        <div className='inputs__header'>
                            <label htmlFor="adminEmail">Email</label>
                            <input type="email" name="Email" id="adminEmail" value={email} onChange={e => { setEmail(e.target.value) }} />
                        </div>
                        <div className='inputs__header'>
                            <label htmlFor="adminSenha">Senha</label>
                            <input type="password" name="Senha" id="adminSenha" value={senha} onChange={e => { setSenha(e.target.value) }} />
                        </div>
                        <div className='inputs__header'>
                            <label htmlFor="adminConfirmaSenha">Confirmar senha</label>
                            <input type="password" name="Confirma senha" id="adminConfirmaSenha" value={senhaConfirmar} onChange={e => { setConfirmaSenha(e.target.value) }} />
                        </div>
                    </div>
                    <div className='informacoes__container__botoes'>
                        <button className='botoes__botaoDeletar' onClick={() => setVisibilityDeletar(e => !e)}>Deletar conta</button>
                        <button className='botoes__botaoSalvar' onClick={() => { setVisibilityAtualizar(e => !e) }}>Salvar</button>
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
                errorStatus={errorMessage}
                setErrorStatus={setErrorMessage}
                functionError={isDataWrong}
            />

            <PopupActions
                title="Atualizar conta"
                textContent="Tem certeza que deseja atualizar suas informações?"
                redButtonText="Cancelar"
                greenButtonText="Atualizar"
                visibility={visibilityAtualizar}
                state={setVisibilityAtualizar}
                errorStatus={errorMessage}
                setErrorStatus={setErrorMessage}
                functionError={isDataWrong}
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