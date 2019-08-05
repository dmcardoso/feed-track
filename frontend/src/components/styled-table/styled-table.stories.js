import React from 'react';
import {storiesOf} from '@storybook/react';
import StyledTable from '.';

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

storiesOf('StyledTable', module)
    .addDecorator(story => <div style={{background: "#ccc", width: '100%', padding: '3rem'}}>{story()}</div>)
    .add('Simple Itens', () => (
        <>
            <StyledTable headers={headers} data={[]} noDataText="Teste sem registro"/>
        </>
    ));
