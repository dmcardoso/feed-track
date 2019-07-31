import React from 'react';
import PropTypes from 'prop-types';
import {
    Item, Icon, Description, Submenu, SubmenuList
} from './style';

function Menu(props) {
    const {collapsed, icon, ...attrs} = props;
    return (
        <Item {...attrs}>
            {icon && <Icon className={icon}/>}
            {collapsed === 'false' && <Description>Filiais</Description>}
            <Submenu>
                <SubmenuList>
                    <div>listar</div>
                    <div>editar</div>
                </SubmenuList>
            </Submenu>
        </Item>
    );
}

Menu.propTypes = {
    icon: PropTypes.string,
};

Menu.defaultProps = {
    icon: null,
};

export default Menu;
