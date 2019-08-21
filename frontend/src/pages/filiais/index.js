import React, { useState, useEffect } from 'react';

import { Main, MainContainer } from '../../components/app-container/style';
import StyledTable from '../../components/styled-table';
import api from '../../services/api';
import Menu from '../../components/menu';

function Filiais(props) {
    const getFiliais = async ({ page, limit }) => {
        const filiais = await api.get('/filiais', { params: { page, limit } });


        return filiais;
    };

    const headers = [
        {
            name: 'Filial',
            accessor: 'filial',
            value: 'Filial',
        },
        {
            name: 'Fundação',
            accessor: 'fundacao',
            value: 'Fundação',
        },
    ];

    const submenuOption = [
        {
            description: 'Editar',
            icon: 'icon-edit',
            title: 'Editar',
            onClick(e) {
                console.log(e, '<<<<<');
            },
        }, {
            description: 'Excluir',
            title: 'Excluir',
            icon: 'icon-trash',
        },
    ];

    return (
        <Main>
            <MainContainer>
                <div>Filiais</div>
                <StyledTable headers={headers} submenuOption={submenuOption} data_function={getFiliais} />
            </MainContainer>
        </Main>
    );
}

export default Filiais;
