import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Main, MainContainer, Title } from '../../components/app-container/style';
import api from '../../services/api';

import ControlledInput from '../../components/controlled-input';
import Button from '../../components/button';

function Form(props) {
    function makeForm({ handleSubmit, isSubmitting, ...props }) {
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    type="text"
                    icon="icon-company"
                    name="filial"
                    id="filial"
                    label="Filial"
                    placeholder="Nome da Filial"
                    component={ControlledInput}
                />
                <Field
                    name="fundacao"
                    id="fundacao"
                    label="Fundação"
                    type="date"
                    component={ControlledInput}
                />
                <Button type="submit" kind={isSubmitting ? 'disabled' : 'save'} label="Enviar" />
            </form>
        );
    }

    return (
        <Main>
            <MainContainer>
                <Title>Filial</Title>
                <Formik
                    validationSchema={Yup.object({
                        filial: Yup.string()
                            .required('Filial é obrigatório!'),
                        fundacao: Yup.mixed()
                            .validDate('Data de fundação inválida!'),
                    })}
                    initialValues={{
                        filial: '',
                        fundacao: '',
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                        const filial = {
                            ...values,
                        };

                        if (
                            filial.fundacao
                            && filial.fundacao !== ''
                            && filial.fundacao instanceof Date
                            && !isNaN(filial.fundacao)
                        ) {
                            filial.fundacao = filial.fundacao.toLocaleDateString();
                        }

                        const result = await api.post('/filiais', {
                            filial,
                        });

                        if (result.status === 200) {
                            setSubmitting(false);
                            resetForm();
                        }
                    }}
                >
                    {makeForm}
                </Formik>
            </MainContainer>
        </Main>
    );
}

export default Form;
