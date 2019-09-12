import React, { useState } from 'react';

import moment from 'moment';
import StyledTable from '../../components/styled-table';
import api from '../../services/api';
import { confirmAlert } from '../../components/confirm-alert';
import { error, success, loading } from '../../components/alerts';
import Page from '../../components/page';

moment.locale('pt-br');

function Filiais(props) {
    const [updateTable, setUpdateTable] = useState(false);

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

    const submenuOption = tableInfo => [
        {
            description: 'Editar',
            icon: 'icon-edit',
            title: 'Editar',
            onClick(e) {
                if (props.history && tableInfo.original) {
                    props.history.push(`/filial/${tableInfo.original.id}`);
                }
            },
        }, {
            description: 'Excluir',
            title: 'Excluir',
            icon: 'icon-trash',
            onClick(e) {
                confirmAlert({
                    title: `Deseja excluir a filial ${tableInfo.original.filial}?`,
                    message: `Ao confirmar a filial ${tableInfo.original.filial} será excluída`,
                    buttons: [
                        {
                            label: 'Sim',
                            onClick(e) {
                                const deleteFilial = async () => {
                                    const loadAlert = loading('Excluindo filial...');

                                    try {
                                        const deleted = await api.delete('/filiais', {
                                            params: {
                                                id: tableInfo.original.id,
                                            },
                                        });

                                        if (deleted.status === 204) {
                                            loadAlert();
                                            setUpdateTable(true);
                                            success('Filial excluída com sucesso!', moment().format('H:m:ss'));
                                            setUpdateTable(false);
                                        }
                                    } catch (e) {
                                        loadAlert();
                                        error('Erro ao excluir filial!');
                                    }
                                };

                                deleteFilial();
                            },
                        },
                        {
                            label: 'Não',
                        },
                    ],
                });
            },
        },
    ];

    return (
        <Page title="Filiais">
            <StyledTable
                headers={headers}
                fireFetch={updateTable}
                submenuOption={submenuOption}
                data_function={getFiliais}
                clickHandler={(state, rowInfo, column, instance) => {
                    if (props.history && rowInfo.original) {
                        props.history.push(`/filial/${rowInfo.original.id}`);
                    }
                }}
            />
        </Page>
    );
}

export default Filiais;
