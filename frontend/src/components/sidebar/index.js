import React, { useContext } from 'react';
import { AppContext } from '../../main/App';

import {
    Sidebar as Nav, Logo, UserImage, UserName, BottomSideBar,
} from './style';

import { Icon, Item, Description } from '../menu/style';
import Menu from '../menu';

function Sidebar() {
    const { changeCollapsed, collapsed } = useContext(AppContext);

    const menu_itens = [
        {
            description: (collapsed === 'true' ? '' : 'Filiais'),
            icon: 'icon-company',
            marginBottom: '10',
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
            icon: 'icon-employee',
            marginBottom: '10',
        },
        {
            description: (collapsed === 'true' ? '' : 'Feedbacks'),
            icon: 'icon-feedback',
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
            <Logo />
            {collapsed === 'false' && <UserImage />}
            {collapsed === 'false' && <UserName>Daniel</UserName>}
            <Item marginBottom={collapsed === 'true' ? 75 : 50}>
                <Icon className="icon-man-user" />
                {collapsed === 'false' && <Description>Perfil</Description>}
            </Item>
            {menu_itens.map(item => <Menu {...item} key={item.icon} />)}
            <BottomSideBar>
                <Item borderBottom={1} width="100%" marginBottom={27.5}>
                    <Icon className="icon-logout" />
                    {collapsed === 'false' && <Description>Sair</Description>}
                </Item>
                <Item onClick={changeCollapsed}>
                    <Icon className={collapsed === 'false' ? 'icon-sidebar-close' : 'icon-sidebar-open'} />
                    {collapsed === 'false' && <Description>Fechar</Description>}
                </Item>
            </BottomSideBar>
        </Nav>
    );
}

export default Sidebar;
