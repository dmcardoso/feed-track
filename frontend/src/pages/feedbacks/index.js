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

    const getFeedbacks = async ({ page, limit }) => {
        const feedbacks = await api.get('/feedbacks', { params: { page, limit } });

        return feedbacks;
    };

    const headers = [
        {
            name: 'Filial',
            accessor: 'filial_feedback.filial',
            value: 'Funcionário',
        },
        {
            name: 'Funcionário',
            accessor: 'funcionario_feedback.nome',
            value: 'Funcionário',
        },
        {
            name: 'Referência',
            accessor: 'data_referencia',
            value: 'Referência',
        },
    ];

    const submenuOption = tableInfo => [
        {
            description: 'Editar',
            icon: 'icon-edit',
            title: 'Editar',
            onClick(e) {
                if (props.history && tableInfo.original) {
                    props.history.push(`/feedback/${tableInfo.original.id}`);
                }
            },
        }, {
            description: 'Excluir',
            title: 'Excluir',
            icon: 'icon-trash',
            onClick(e) {
                confirmAlert({
                    title: `Deseja excluir o feedback do dia ${tableInfo.original.data_referencia}?`,
                    message: `Ao confirmar o feedback do dia ${tableInfo.original.data_referencia} será excluído.`,
                    buttons: [
                        {
                            label: 'Sim',
                            onClick(e) {
                                const deleteFilial = async () => {
                                    const loadAlert = loading('Excluindo feedback...');

                                    try {
                                        const deleted = await api.delete(`/feedbacks/${tableInfo.original.id}`);

                                        if (deleted.status === 204) {
                                            loadAlert();
                                            setUpdateTable(true);
                                            success('Feedback excluído com sucesso!', moment().format('H:m:ss'));
                                            setUpdateTable(false);
                                        }
                                    } catch (e) {
                                        loadAlert();
                                        error('Erro ao excluir feedback!');
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
        <Page title="Feedbacks">
            <StyledTable
                headers={headers}
                fireFetch={updateTable}
                submenuOption={submenuOption}
                data_function={getFeedbacks}
                clickHandler={(state, rowInfo, column, instance) => {
                    if (props.history && rowInfo.original) {
                        props.history.push(`/feedback/${rowInfo.original.id}`);
                    }
                }}
            />
        </Page>
    );
}

export default Filiais;
