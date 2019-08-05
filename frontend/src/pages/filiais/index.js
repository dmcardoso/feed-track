import React from 'react';

import {Main, MainContainer} from '../../components/app-container/style';
import StyledTable from '../../components/styled-table';

function Filiais(props) {

    const headers = [
        {
            name: 'Nome da tabela',
            acessor: 'primeiro',
            value: 'Tabela',
        },
        {
            name: 'Nome da tabela 2',
            acessor: 'segundo',
            value: 'Tabela 2'
        },
    ];

    return (
        <Main>
            <MainContainer>
                <div>Filiais</div>
                <StyledTable headers={headers} data={[]}/>
            </MainContainer>
        </Main>
    );
}

export default Filiais;
