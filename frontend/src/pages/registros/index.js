import React, { useState } from 'react';

import moment from 'moment';
import StyledTable from '../../components/styled-table';
import api from '../../services/api';
import { confirmAlert } from '../../components/confirm-alert';
import { error, success, loading } from '../../components/alerts';
import Page from '../../components/page';
import Popup from '../../components/popup';
import Input from '../../components/form-components/input';

moment.locale('pt-br');

function Registros(props) {
    const [updateTable, setUpdateTable] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [registro, setRegistro] = useState(null);

    const getRegistros = async ({ page, limit }) => {
        const registros = await api.get('/registros', { params: { page, limit } });

        return registros;
    };

    const headers = [
        {
            name: 'Tabela',
            accessor: 'grupo_descricao',
            value: 'Tabela',
        },
        {
            name: 'Usuário',
            accessor: 'funcionario.nome',
            value: 'Usuário',
        },
        {
            name: 'Data de referência',
            accessor: 'criacao',
            value: 'Data de referência',
        },
        {
            name: 'Ação',
            accessor: 'action_descricao',
            value: 'Ação',
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
        <Page title="Registros">
            <StyledTable
                headers={headers}
                fireFetch={updateTable}
                // submenuOption={submenuOption}
                data_function={getRegistros}
                clickHandler={(state, rowInfo, column, instance) => {
                    setPopupVisible(true);
                    setRegistro(rowInfo.original);
                }}
            />
            <Popup
                open={popupVisible}
                closeEvent={() => {
                    setPopupVisible(false);
                    setRegistro(null);
                }}
                onClose={() => {
                    setPopupVisible(false);
                    setRegistro(null);
                }}
                header="Registro"
            >
                {(() => {
                    if (registro && registro.id) {
                        return (
                            <>
                                {registro.mensagem && registro.mensagem !== '' && <Input name="mensagem" type="text" label="Mensagem" disabled value={registro.mensagem} height="auto" margin="0 0 10px 0" />}
                                {registro.action_descricao && registro.action_descricao !== '' && <Input name="action" type="text" label="Ação" disabled value={registro.action_descricao} height="auto" margin="0 0 10px 0" />}
                                {registro.criacao && registro.criacao !== '' && <Input name="criacao" type="text" label="Data de referência" disabled value={registro.criacao} height="auto" margin="0 0 10px 0" />}
                                {registro.grupo_descricao && registro.grupo_descricao !== '' && <Input name="grupo_descricao" type="text" label="Tabela" disabled value={registro.grupo_descricao} height="auto" margin="0 0 10px 0" />}
                                {registro.historico && registro.historico !== '' && <Input name="historico" type="text" label="Histórico" disabled value={registro.historico} height="240px" as="textarea" margin="0 0 10px 0" />}
                                {registro.funcionario && registro.funcionario.nome && registro.funcionario.nome !== '' && <Input name="nome" type="text" label="Funcionário responsável" margin="0 0 10px 0" disabled value={registro.funcionario.nome} height="auto" />}
                            </>
                        );
                    }
                    return (
                        <>
                        </>
                    );
                })()}
            </Popup>
        </Page>
    );
}

export default Registros;
