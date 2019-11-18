import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import { AppContext } from '../../main/App';
import logo from '../../assets/img/logo.png';
import api from '../../services/api';

import {
    Sidebar as Nav, Logo, UserImage, UserName, BottomSideBar,
} from './style';

import Menu from '../menu';

function Sidebar(props) {
    const { changeCollapsed, collapsed } = useContext(AppContext);

    const menu_itens = [
        {
            description: (collapsed === 'true' ? '' : 'Filiais'),
            icon: 'icon-company',
            marginBottom: '10',
            link: '/filiais',
            // clickable: true,
            submenu: [
                {
                    description: 'Nova',
                    icon: 'icon-register',
                    marginBottom: '10',
                    onClick() {
                        props.history.push('/filial');
                    },
                },
                {
                    description: 'Listar',
                    icon: 'icon-feedback',
                    marginBottom: '10',
                    onClick() {
                        props.history.push('/filiais');
                    },
                },
            ],
        },
        {
            description: (collapsed === 'true' ? '' : 'Funcionários'),
            link: '/funcionarios',
            icon: 'icon-employee',
            marginBottom: '10',
            submenu: [
                {
                    description: 'Novo',
                    icon: 'icon-register',
                    marginBottom: '10',
                    onClick() {
                        props.history.push('/funcionario');
                    },
                },
                {
                    description: 'Listar',
                    icon: 'icon-feedback',
                    marginBottom: '10',
                    onClick() {
                        props.history.push('/funcionario');
                    },
                },
            ],
        },
        {
            description: (collapsed === 'true' ? '' : 'Feedbacks'),
            icon: 'icon-feedback',
            link: '/feedbacks',
            marginBottom: '10',
            submenu: [
                {
                    description: 'Novo',
                    icon: 'icon-register',
                    marginBottom: '10',
                    onClick() {
                        props.history.push('/feedback');
                    },
                },
                {
                    description: 'Listar',
                    icon: 'icon-feedback',
                    marginBottom: '10',
                    onClick() {
                        props.history.push('/feedbacks');
                    },
                },
            ],
        },
        {
            description: (collapsed === 'true' ? '' : 'Registro de Atividades'),
            icon: 'icon-history',
            marginBottom: '32',
            link: '/registros',
        },
    ];

    const userData = JSON.parse(localStorage.getItem('userKey'));
    const foto = userData.foto ? `${api.defaults.baseURL}images/${userData.foto}` : null;

    return (
        <Nav>
            <Logo src={logo} />
            {collapsed === 'false' && foto && <UserImage src={foto} />}
            {collapsed === 'false' && <UserName>{userData.nome}</UserName>}
            <Menu
                marginBottom={collapsed === 'true' ? 75 : 50}
                icon="icon-man-user"
                as="div"
                link={userData && userData.id ? `funcionario/${userData.id}` : 'funcionarios'}
                description={collapsed === 'true' ? null : 'Perfil'}
            />
            {menu_itens.map(item => <Menu {...item} key={item.icon} />)}
            <BottomSideBar>
                <Menu
                    description={collapsed === 'true' ? null : 'Sair'}
                    borderBottom={1}
                    as="div"
                    width="100%"
                    marginBottom={27.5}
                    icon="icon-logout"
                />
                <Menu
                    onClick={changeCollapsed}
                    as="div"
                    description={collapsed === 'true' ? null : 'Fechar'}
                    icon={collapsed === 'false' ? 'icon-sidebar-close' : 'icon-sidebar-open'}
                />
            </BottomSideBar>
        </Nav>
    );
}

export default withRouter(Sidebar);
