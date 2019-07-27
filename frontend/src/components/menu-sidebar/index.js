import React from 'react';
import {
    List, Item, Icon, Description,
} from './style';

function MenuSideBar(props) {
    const { collapsed } = props;
    return (
        <List>
            <Item>
                <Icon className="icon-company" />
                {collapsed === 'false' && <Description>Filiais</Description>}
            </Item>
            <Item>
                <Icon className="icon-employee" />
                {collapsed === 'false' && <Description>Funcionários</Description>}
            </Item>
            <Item>
                <Icon className="icon-feedback" />
                {collapsed === 'false' && <Description>Feedbakcs</Description>}
            </Item>
            <Item>
                <Icon className="icon-history" />
                {collapsed === 'false' && <Description>Registro de Atividades</Description>}
            </Item>
        </List>
    );
}

export default MenuSideBar;
