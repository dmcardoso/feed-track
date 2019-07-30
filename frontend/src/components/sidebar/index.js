import React, { useContext } from 'react';
import { AppContext } from '../../main/App';

import {
    Sidebar as Nav, Logo, UserImage, UserName, BottomSideBar,
} from './style';

import { Icon, Item, Description } from '../menu-sidebar/style';
import MenuSideBar from '../menu-sidebar';

function Sidebar() {
    const { changeCollapsed, collapsed } = useContext(AppContext);

    return (
        <Nav>
            <Logo />
            {collapsed === 'false' && <UserImage />}
            {collapsed === 'false' && <UserName>Daniel</UserName>}
            <Item marginBottom={collapsed === 'true' ? 75 : 50}>
                <Icon className="icon-man-user" />
                {collapsed === 'false' && <Description>Perfil</Description>}
            </Item>
            <MenuSideBar collapsed={collapsed} />
            <BottomSideBar>
                <Item borderBottom marginBottom={27.5}>
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
