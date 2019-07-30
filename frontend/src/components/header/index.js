import React, { useContext } from 'react';

import Input from '../input';
import { AppContext } from '../../main/App';

import { StyledHeader, Icon } from './style';
import { colors } from '../../configs/styled-components-options';


function Header() {
    const { changeTheme } = useContext(AppContext);

    return (
        <StyledHeader>
            <Input
                type="text"
                name="search"
                icon="icon-search"
                background_color={colors.grey}
                height="60px"
                width="430px"
                margin="auto 0"
                placeholder="Digite o que procura"
            />
            <Icon className="icon-sun" onClick={() => changeTheme()} />
        </StyledHeader>
    );
}

export default Header;
