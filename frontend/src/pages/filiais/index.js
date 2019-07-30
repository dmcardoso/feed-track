import React from 'react';

import { Main, MainContainer } from '../../components/app-container/style';
import StyledTable from '../../components/styled-table';

function Filiais(props) {
    return (
        <Main>
            <MainContainer>
                <div>Filiais</div>
                <StyledTable />
            </MainContainer>
        </Main>
    );
}

export default Filiais;
