import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import api from '../../services/api';
import ControlledInput from '../../components/controlled-input';
import { parser } from '../../util/select-parser';
import { Row, Subtitle } from '../common-styles';
import Button from '../../components/button';
import { Form } from './style';

function Permissoes({ funcionario }) {
    const [permissoes, setPermissoes] = useState([]);

    useEffect(() => {
        const getPermissoes = async () => {
            const requested_permissoes = await api.get('/permissoes');

            const parser_permissoes = parser('permissao', 'id', requested_permissoes.data.results);

            setPermissoes(parser_permissoes);
        };

        if (funcionario.id) {
            getPermissoes();
        }
    }, []);

    function makeForm({
        handleSubmit, values, isSubmitting, ...props
    }) {
        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    name="permissoes"
                    options={permissoes}
                    type="input_checkbox"
                    component={ControlledInput}
                />
                <Row align="flex-end">
                    <Button kind={isSubmitting ? 'disabled' : 'save'} type="submit" height="60px" label="Salvar" />
                </Row>
            </Form>
        );
    }
    return (
        <>
            <Row align="flex-start" align_items="center">
                <Subtitle>Permissões deste funcionário</Subtitle>
            </Row>
            <Formik
                initialValues={{
                    permissoes: [],
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {makeForm}
            </Formik>
        </>
    );
}

export default Permissoes;
