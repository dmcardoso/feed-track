import React, { useState } from 'react';

import moment from 'moment';
import StyledTable from '../../components/styled-table';
import api from '../../services/api';
import { confirmAlert } from '../../components/confirm-alert';
import { error, success, loading } from '../../components/alerts';
import Page from '../../components/page';

moment.locale('pt-br');

function Funcionarios(props) {
    const [updateTable, setUpdateTable] = useState(false);

    const getFuncionarios = async ({ page, limit }) => {
        const funcionarios = await api.get('/funcionarios', { params: { page, limit } });

        return funcionarios;
    };

    const headers = [
        {
            name: 'Nome',
            accessor: 'nome',
            value: 'Nome',
        },
        {
            name: 'E-mail',
            accessor: 'email',
            value: 'E-mail',
        },
        {
            name: 'Data de Nascimento',
            accessor: 'nascimento',
            value: 'Data de Nascimento',
        },
    ];

    const submenuOption = tableInfo => [
        {
            description: 'Editar',
            icon: 'icon-edit',
            title: 'Editar',
            onClick(e) {
                if (props.history && tableInfo.original) {
                    props.history.push(`/funcionario/${tableInfo.original.id}`);
                }
            },
        }, {
            description: 'Excluir',
            title: 'Excluir',
            icon: 'icon-trash',
            onClick(e) {
                confirmAlert({
                    title: `Deseja excluir o funcionário ${tableInfo.original.nome}?`,
                    message: `Ao confirmar, o funcionário ${tableInfo.original.nome} será excluído.`,
                    buttons: [
                        {
                            label: 'Sim',
                            onClick(e) {
                                const deleteFilial = async () => {
                                    const loadAlert = loading('Excluindo feedback...');

                                    try {
                                        const deleted = await api.delete('/funcionarios', {
                                            params: {
                                                id: tableInfo.original.id,
                                            },
                                        });

                                        if (deleted.status === 204) {
                                            loadAlert();
                                            setUpdateTable(true);
                                            success('Funcionário excluído com sucesso!', moment().format('H:m:ss'));
                                            setUpdateTable(false);
                                        }
                                    } catch (e) {
                                        console.log(e);
                                        loadAlert();
                                        error('Erro ao excluir funcionário!');
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
        <Page title="Funcionários">
            <StyledTable
                headers={headers}
                fireFetch={updateTable}
                submenuOption={submenuOption}
                data_function={getFuncionarios}
                clickHandler={(state, rowInfo, column, instance) => {
                    if (props.history && rowInfo.original) {
                        props.history.push(`/funcionario/${rowInfo.original.id}`);
                    }
                }}
            />
        </Page>
    );
}

export default Funcionarios;
