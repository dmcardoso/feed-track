import React, { useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Main, MainContainer, Title } from '../../components/app-container/style';
import { FieldContainer, Row } from '../common-styles';
import ControlledInput from '../../components/controlled-input';
import Button from '../../components/button';
import api from '../../services/api';
import { parser } from '../../util/select-parser';
import { numberOrZero } from '../../util/number';
import { datePickerDateParser, ptBrDateToDateObject } from '../../util/date-picker-parser';

function Feedback(props) {
    const [defaultOptions, setDefaultOptions] = useState([]);
    const [feedback, setFeedback] = useState(null);

    const initialValues = feedback || {
        filial: '',
        data_referencia: new Date(),
        vendas: '',
        cadastros: '',
        renovacoes: '',
        reativacoes: '',
        descricao: '',
    };

    async function loadFiliais(search, callback = null) {
        const params = {
            filial: search || '',
            limit: 15,
        };

        const filiais = await api.get('filiais', {
            params,
        });

        const options = parser('filial', 'id', filiais.data.results);

        if (callback) {
            callback(options);
        }

        return options;
    }

    async function getFeedback(feedback_id) {
        const params = {
            id: feedback_id,
        };

        const feedback_requested = await api.get('feedbacks', {
            params,
        });

        return feedback_requested.data || null;
    }

    useEffect(() => {
        const feedback_id = props.match.params.id || null;

        const getDefaultOptions = async () => {
            const filiais = await loadFiliais();
            setDefaultOptions(filiais);
        };

        const getRequestedFeedback = async (id) => {
            const requested_feedback = await getFeedback(id);
            const { filial_feedback } = requested_feedback;
            requested_feedback.filial = { label: filial_feedback.filial, value: filial_feedback.id };
            requested_feedback.data_referencia = ptBrDateToDateObject(requested_feedback.data_referencia);
            setFeedback(requested_feedback);
        };

        if (feedback_id) {
            getRequestedFeedback(feedback_id);
        }

        getDefaultOptions();
    }, [props.match.params.id]);

    function makeForm({
        handleSubmit, isSubmitting, initialValues, ...props
    }) {
        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <FieldContainer size={3}>
                        <Field
                            type="select"
                            type_select="async"
                            icon="icon-company"
                            name="filial"
                            loadOptions={loadFiliais}
                            id="filial"
                            cacheOptions
                            defaultOptions={defaultOptions}
                            label="Filial"
                            defaultValue={initialValues.filial}
                            placeholder="Filial"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                    <FieldContainer size={3}>
                        <Field
                            type="date"
                            name="data_referencia"
                            id="data_referencia"
                            label="Data de Referência"
                            placeholder="Data de referência do Feedback"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                </Row>
                <Row>
                    <FieldContainer size={3}>
                        <Field
                            type="number"
                            icon="icon-sell"
                            name="vendas"
                            id="vendas"
                            label="Quantidade de Vendas"
                            placeholder="Vendas"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                    <FieldContainer size={3}>
                        <Field
                            type="number"
                            icon="icon-register"
                            name="cadastros"
                            id="cadastros"
                            label="Quantidade de Cadastros"
                            placeholder="Cadastros"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                </Row>
                <Row>
                    <FieldContainer size={3}>
                        <Field
                            type="number"
                            icon="icon-renovation"
                            name="renovacoes"
                            id="renovacoes"
                            label="Quantidade de Renovações"
                            placeholder="Renovações"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                    <FieldContainer size={3}>
                        <Field
                            type="number"
                            icon="icon-refresh"
                            name="reativacoes"
                            id="reativacoes"
                            label="Quantidade de Reativações"
                            placeholder="Reativações"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                </Row>
                <Row>
                    <FieldContainer size={1}>
                        <Field
                            as="textarea"
                            icon="icon-description"
                            name="descricao"
                            id="descricao"
                            label="Descrição"
                            placeholder="Descrição"
                            height="200px"
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
        <Main>
            <MainContainer>
                <Title>Feedback</Title>
                <Formik
                    enableReinitialize
                    validationSchema={Yup.object({
                        descricao: Yup.string()
                            .required('Descrição é obrigatório!'),
                        data_referencia: Yup.mixed()
                            .required('Data de refência é obrigatório!')
                            .validDate('Data de refência inválida!'),
                        vendas: Yup.number('Quantidade de vendas inválidas!'),
                        cadastros: Yup.number('Quantidade de cadastros inválidos!'),
                        renovacoes: Yup.number('Quantidade de renovações inválidas!'),
                        reativacoes: Yup.number('Quantidade de reativações inválidas!'),
                        filial: Yup.mixed()
                            .required('Filial é obrigatória!'),
                    })}
                    initialValues={initialValues}
                    onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                        const feedback_to_save = { ...values };

                        if (feedback && feedback.id) {
                            feedback_to_save.id = feedback.id;
                        }

                        feedback_to_save.vendas = numberOrZero(feedback_to_save.vendas);
                        feedback_to_save.cadastros = numberOrZero(feedback_to_save.cadastros);
                        feedback_to_save.renovacoes = numberOrZero(feedback_to_save.renovacoes);
                        feedback_to_save.reativacoes = numberOrZero(feedback_to_save.reativacoes);

                        if (feedback_to_save.data_referencia && feedback_to_save.data_referencia !== '') {
                            feedback_to_save.data_referencia = datePickerDateParser(feedback_to_save.data_referencia);
                        }

                        feedback_to_save.filial = feedback_to_save.filial.value;

                        // TODO pegar o funcionário atual
                        feedback_to_save.funcionario = 1;

                        const result = await api.post('/feedbacks', {
                            feedback: feedback_to_save,
                        });

                        if (result.status === 200) {
                            const { id } = result.data;
                            setSubmitting(false);
                            props.history.push(`feedback/${id}`);
                        }
                    }}
                >
                    {makeForm}
                </Formik>
            </MainContainer>
        </Main>
    );
}

export default Feedback;
