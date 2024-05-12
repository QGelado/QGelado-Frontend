import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import "./style.css"
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuLateral = ({ selecao, adminName }) => {
  return (
    <div className='menulateral__container'>
      <Sidebar backgroundColor='#C3EFFF' rootStyles={{
        borderRight: "5px solid",
        borderRightColor: "#197CFF",
        height: "100%"
      }}>
        <img src="../../public/imgs/logo_qgelado.svg" alt="Logo QGelado" className='logo__menulateral imagens-centralizadas' />

        <section className='adminName__container'>
          <img src="../../public/imgs/MenuLateral/admin_photo.svg" alt="Foto perfil admin" className='photo_perfil imagens-centralizadas' />
          <p style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>{adminName}</p>
        </section>

        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  color: "#000",
                  backgroundColor: active ? '#87DFFF' : undefined,
                };
            },
          }}
        >
          <MenuItem component={<Link to="/" />} active={selecao == "relatorio" ? true : false} >Relatório</MenuItem>
          <SubMenu label="Cadastrar produto">
            <MenuItem component={<Link to="/" />} active={selecao == "sorvetePadrao" ? true : false}>Sorvete padrão</MenuItem>
            <MenuItem component={<Link to="/" />} active={selecao == "recipiente" ? true : false}>Recipiente</MenuItem>
            <MenuItem component={<Link to="/" />} active={selecao == "acompanhamento" ? true : false}>Acompanhamento</MenuItem>
            <MenuItem component={<Link to="/" />} active={selecao == "saborSorvete" ? true : false}>Sabor sorvete</MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/" />} active={selecao == "pedidos" ? true : false}>Pedidos</MenuItem>
          <MenuItem component={<Link to="/" />} active={selecao == "conta" ? true : false}>Conta</MenuItem>
          <MenuItem component={<Link to="/" />} active={selecao == "sair" ? true : false}>Sair</MenuItem>
        </Menu>
      </Sidebar >
    </div>

  )
}

MenuLateral.propTypes = {
  selecao: PropTypes.string,
  adminName: PropTypes.string.isRequired,
};

export default MenuLateral;