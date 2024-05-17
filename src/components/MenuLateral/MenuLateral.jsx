import {useState} from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import "./style.css"
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaChartBar, FaProductHunt, FaIceCream  } from "react-icons/fa";
import { MdOutlineStickyNote2, MdOutlineAccountBox, MdLogout,  } from "react-icons/md";
import { TbCone2 } from "react-icons/tb";
import { GiChocolateBar, GiStrawberry  } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { GoArchive } from "react-icons/go";

const MenuLateral = ({ selecao, adminName }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='menulateral__container'>
      <div className='collapse__container' onClick={() => setCollapsed(e => !e)} style={{left: !collapsed ? "239px" : "70px"}}>
        <IoIosArrowForward color='#fff'/>
      </div>
      <Sidebar backgroundColor='#C3EFFF' rootStyles={{
        borderRight: "5px solid",
        borderRightColor: "#197CFF",
        height: "100%"
      }} collapsed={collapsed}>
        <img src="../../public/imgs/logo_qgelado.svg" alt="Logo QGelado" className='logo__menulateral imagens-centralizadas' />

        <section className='adminName__container'>
          <img src="../../public/imgs/Conta/admin_photo.svg" alt="Foto perfil admin" className='photo_perfil imagens-centralizadas' />
          <p style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", display: !collapsed ? "block" : "none" }}>{adminName}</p>
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
          <MenuItem component={<Link to="/" />} active={selecao == "relatorio" ? true : false} icon={<FaChartBar />}>Relatório</MenuItem>
          <SubMenu label="Cadastrar produto" icon={<FaProductHunt />}  >
            <MenuItem component={<Link to="/" />} active={selecao == "sorvetePadrao" ? true : false} icon={<FaIceCream />}>Sorvete padrão</MenuItem>
            <MenuItem component={<Link to="/" />} active={selecao == "recipiente" ? true : false} icon={<TbCone2 />}>Recipiente</MenuItem>
            <MenuItem component={<Link to="/" />} active={selecao == "acompanhamento" ? true : false} icon={<GiChocolateBar />}>Acompanhamento</MenuItem>
            <MenuItem component={<Link to="/" />} active={selecao == "saborSorvete" ? true : false}  icon={<GiStrawberry />}>Sabor sorvete</MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/" />} active={selecao == "pedidos" ? true : false}  icon={<MdOutlineStickyNote2 />}>Pedidos</MenuItem>
          <MenuItem component={<Link to="/" />} active={selecao == "estoque" ? true : false}  icon={<GoArchive  />}>Estoque</MenuItem>
          <MenuItem component={<Link to="/" />} active={selecao == "conta" ? true : false} icon={<MdOutlineAccountBox />}>Conta</MenuItem>
          <MenuItem component={<Link to="/" />} active={selecao == "sair" ? true : false} icon={<MdLogout />}>Sair</MenuItem>
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