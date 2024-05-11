import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './style.css';

const Conta = () => {
    return (
        <main className='conta__main'>
            <MenuLateral selecao="conta" adminName="Wilson Vendramel"/>
            <section className="container__conta">
                <div className='conta__titulo'>
                    <h1>Conta</h1>
                </div>
                <div className='conta__nomeAdmin'>
                    <img src="../../public/imgs/MenuLateral/admin_photo.svg" alt="Foto perfil admin" />

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
                        <button className='botoes__botaoDeletar'>Deletar conta</button>
                        <button className='botoes__botaoSalvar'>Salvar</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Conta