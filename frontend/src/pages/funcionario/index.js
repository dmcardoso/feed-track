import React, { useEffect, useState, useContext } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import ControlledUploadFile from '../../components/controlled-upload-file';

import Page from '../../components/page';
import ControlledInput from '../../components/controlled-input';
import Button from '../../components/button';

import api from '../../services/api';
import { datePickerDateParser, ptBrDateToDateObject } from '../../util/date-picker-parser';
import { FieldContainer, Row } from '../common-styles';
import { AppContainerContext } from '../../components/app-container';
import { error } from '../../components/alerts';

function Funcionario(props) {
    const [funcionario, setFuncionario] = useState(null);
    const {
        setLoading, setActivities,
    } = useContext(AppContainerContext);

    const initialValues = funcionario || {
        foto: '',
        nome: '',
        email: '',
        nascimento: '',
        senha: '',
        sexo: '',
        senha_confirmacao: '',
    };

    async function getFuncionario(funcionario_id) {
        const params = {
            id: funcionario_id,
        };

        const funcionario_requested = await api.get('funcionarios', {
            params,
        });

        return funcionario_requested.data || null;
    }

    useEffect(() => {
        const funcionario_id = props.match.params.id || null;

        const getRequestedFuncionario = async (id) => {
            const requested_funcionario = await getFuncionario(id);

            if (requested_funcionario) {
                const filial_activities = [];

                if (requested_funcionario.inserted) {
                    filial_activities.push(requested_funcionario.inserted);
                }

                if (requested_funcionario.updated) {
                    filial_activities.push(requested_funcionario.updated);
                }

                if (filial_activities.length > 0) {
                    setActivities(filial_activities);
                }

                if (requested_funcionario.nascimento) {
                    requested_funcionario.nascimento = ptBrDateToDateObject(requested_funcionario.nascimento);
                } else {
                    requested_funcionario.nascimento = '';
                }

                const {
                    inserted, updated, permissoes, desativado, ...funcionario_form
                } = { ...requested_funcionario };

                funcionario_form.senha = '';
                funcionario_form.senha_confirmacao = '';

                setFuncionario(funcionario_form);
                setLoading(false);
            } else {
                props.history.push('/filial');
                error('Erro! Filial não encontrada!');
                setLoading(false);
            }
        };

        if (funcionario_id) {
            setLoading(true);
            getRequestedFuncionario(funcionario_id);
        }
    }, [props.match.params.id]);

    function makeForm({ handleSubmit, isSubmitting, ...props }) {
        return (
            <form onSubmit={handleSubmit} autoComplete="off">
                <Row align="center">
                    <Field
                        name="foto"
                        component={ControlledUploadFile}
                    />
                </Row>
                <Row>
                    <FieldContainer size={3}>

                        <Field
                            type="text"
                            icon="icon-man-user"
                            name="nome"
                            id="nome"
                            label="Nome"
                            placeholder="Nome"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                    <FieldContainer size={3}>
                        <Field
                            type="email"
                            icon="icon-email"
                            name="email"
                            id="email"
                            label="E-mail"
                            placeholder="E-mail"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                </Row>
                <Row>
                    <FieldContainer size={3}>
                        <Field
                            type="date"
                            name="nascimento"
                            id="nascimento"
                            label="Data de Nascimento"
                            placeholder="Data de Nascimento"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                    <FieldContainer size={3}>
                        <Field
                            type="input_radio"
                            name="sexo"
                            label="Sexo"
                            height="auto"
                            options={
                                [
                                    {
                                        label: 'Masculino',
                                        value: 'm',
                                    },
                                    {
                                        label: 'Feminino',
                                        value: 'f',
                                    },
                                ]
                            }
                            component={ControlledInput}
                        />
                    </FieldContainer>
                </Row>
                <Row>
                    <FieldContainer size={3}>
                        <Field
                            type="password"
                            icon="icon-lock"
                            name="senha"
                            id="senha"
                            label="Senha"
                            placeholder="Senha"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                    <FieldContainer size={3}>
                        <Field
                            type="password"
                            icon="icon-lock"
                            name="senha_confirmacao"
                            id="senha_confirmacao"
                            label="Confirmação de senha"
                            placeholder="Confirmação de senha"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                </Row>
                <Row align="flex-end">
                    <Button type="submit" kind={isSubmitting ? 'disabled' : 'save'} label="Enviar" />
                </Row>
            </form>
        );
    }

    return (
        <Page title="Funcionário">
            <Formik
                enableReinitialize
                validationSchema={Yup.object({
                    nome: Yup.string()
                        .required('Nome é obrigatório!')
                        .trim('Informe o nome!')
                        .min(6, 'Nome deve conter no mímino 6 dígitos!'),
                    email: Yup.string()
                        .required('E-mail é obrigatório!')
                        .email('E-mail inválido!'),
                    nascimento: Yup.mixed()
                        .validDate('Data de nascimento inválida!'),
                    senha: Yup.string()
                        .required('Senha é obrigatória!')
                        .oneOf([Yup.ref('senha_confirmacao'), null], 'Senhas devem ser iguais!')
                        .min(6, 'Senha deve conter no mínimo 6 dígitos!'),
                    senha_confirmacao: Yup.string()
                        .required('Confirmação de senha é obrigatória!')
                        .oneOf([Yup.ref('senha'), null], 'Senhas devem ser iguais!')
                        .min(6, 'Senha deve conter no mínimo 6 dígitos!'),
                })}
                onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                    const funcionario_to_save = { ...values };
                    const data = new FormData();

                    console.log(funcionario_to_save);
                    if (
                        funcionario_to_save.nascimento
                        && funcionario_to_save.nascimento !== ''
                    ) {
                        funcionario_to_save.nascimento = datePickerDateParser(funcionario_to_save.nascimento);
                    }

                    Object.keys(funcionario_to_save).forEach((value, index) => {
                        const index_value = funcionario_to_save[value];

                        if (index_value instanceof File) {
                            data.append(value, index_value);
                        } else {
                            data.set(value, index_value);
                        }
                    });

                    const result = await api.post('/funcionarios', data);

                    console.log(result);
                }}
                initialValues={initialValues}
            >
                {makeForm}
            </Formik>
        </Page>
    );
}

export default Funcionario;
