import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import StyledTable from '../../components/styled-table';
import api from '../../services/api';
import { FieldContainer, Row, Subtitle } from '../common-styles';
import { Form } from './style';
import TogglableContent from '../../components/togglable-content';
import ControlledInput from '../../components/controlled-input';

function Funcionarios({ history, filial }) {
    const [updateTable, setUpdateTable] = useState(false);
    const [hiddenFormOpen, setHiddenFormOpen] = useState(false);

    async function getFuncionarios(data) {
        if (filial && filial.id) {
            const funcionarios_filial = await api.get('filiais/funcionarios', {
                params: { ...data, filial: filial.id },
            });

            return funcionarios_filial;
        }
        return {};
    }
    const headers = [
        {
            name: 'Nome',
            accessor: 'funcionario_filial.nome',
            value: 'Nome',
        },
        {
            name: 'E-mail',
            accessor: 'funcionario_filial.email',
            value: 'E-mail',
        },
        {
            name: 'Data de Nascimento',
            accessor: 'funcionario_filial.nascimento',
            value: 'Data de Nascimento',
        },
        {
            name: 'Cargo',
            accessor: 'cargo_funcionario.descricao',
            value: 'Cargo',
        },
    ];

    function makeForm({ handleSubmit }) {
        return (
            <Form onSubmit={handleSubmit}>
                <FieldContainer size={4}>

                    <Field
                        type="select"
                        type_select="async"
                        icon="icon-company"
                        name="filial"
                        // loadOptions={loadFiliais}
                        id="filial"
                        cacheOptions
                        // defaultOptions={defaultOptions}
                        label="Filial"
                        // width="90px"
                        // defaultValue={initialValues.filial}
                        placeholder="Filial"
                        component={ControlledInput}
                    />
                </FieldContainer>
            </Form>
        );
    }

    return (
        <>
            <Subtitle>Funcionários desta Filial</Subtitle>
            <Subtitle onClick={() => setHiddenFormOpen(!hiddenFormOpen)}>Clica</Subtitle>
            <TogglableContent isOpen={hiddenFormOpen}>
                <Formik>
                    {makeForm}
                </Formik>
            </TogglableContent>
            <StyledTable
                headers={headers}
                fireFetch={updateTable}
                data_function={getFuncionarios}
                clickHandler={(state, rowInfo, column, instance) => {
                    if (history && rowInfo.original) {
                        history.push(`/funcionario/${rowInfo.original.id}`);
                    }
                }}
                noDataText="Nenhum funcionário registrado nessa filial."
            />
        </>
    );
}

export default Funcionarios;
