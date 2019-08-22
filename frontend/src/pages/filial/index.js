import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { Row, FieldContainer } from '../common-styles';

import ControlledInput from '../../components/controlled-input';
import Button from '../../components/button';
import { datePickerDateParser } from '../../util/date-picker-parser';
import Page from '../../components/page';

function Form(props) {
    function makeForm({ handleSubmit, isSubmitting, ...props }) {
        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <FieldContainer size={3}>
                        <Field
                            type="text"
                            icon="icon-company"
                            name="filial"
                            id="filial"
                            label="Filial"
                            placeholder="Nome da Filial"
                            component={ControlledInput}
                        />
                    </FieldContainer>
                    <FieldContainer size={3}>
                        <Field
                            name="fundacao"
                            id="fundacao"
                            label="Fundação"
                            type="date"
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
        <Page title="Filial">
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
                    ) {
                        filial.fundacao = datePickerDateParser(filial.fundacao);
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
        </Page>
    );
}

export default Form;
