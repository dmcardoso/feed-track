import React, { useContext } from 'react';
import { AppContext } from '../../main/App';
import logo from '../../assets/img/logo.png';

import {
    Sidebar as Nav, Logo, UserImage, UserName, BottomSideBar,
} from './style';

import Menu from '../menu';

function Sidebar() {
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
                    description: 'Editar',
                    icon: 'icon-edit',
                    marginBottom: '10',
                    onClick() {
                        console.log('clicked in item submenu 1');
                    },
                },
            ],
        },
        {
            description: (collapsed === 'true' ? '' : 'Funcionários'),
            link: '/funcionarios',
            icon: 'icon-employee',
            marginBottom: '10',
        },
        {
            description: (collapsed === 'true' ? '' : 'Feedbacks'),
            icon: 'icon-feedback',
            link: '/feedbacks',
            marginBottom: '10',
        },
        {
            description: (collapsed === 'true' ? '' : 'Registro de Atividades'),
            icon: 'icon-history',
            marginBottom: '32',
        },
    ];

    return (
        <Nav>
            <Logo src={logo} />
            {collapsed === 'false' && <UserImage />}
            {collapsed === 'false' && <UserName>Daniel</UserName>}
            <Menu
                marginBottom={collapsed === 'true' ? 75 : 50}
                icon="icon-man-user"
                as="div"
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

export default Sidebar;
