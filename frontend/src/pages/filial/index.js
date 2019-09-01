import React, { useEffect, useState, useContext } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { Row, FieldContainer } from '../common-styles';

import ControlledInput from '../../components/controlled-input';
import Button from '../../components/button';
import { datePickerDateParser, ptBrDateToDateObject } from '../../util/date-picker-parser';
import Page from '../../components/page';
import { AppContainerContext } from '../../components/app-container';
import { error, success } from '../../components/alerts';

function Form(props) {
    const [filial, setFilial] = useState(null);
    const {
        setLoading, setActivities,
    } = useContext(AppContainerContext);

    const initialValues = filial || {
        filial: '',
        fundacao: '',
    };

    async function getFilial(filial_id) {
        const params = {
            id: filial_id,
        };

        const filial_requested = await api.get('filiais', {
            params,
        });

        return filial_requested.data || null;
    }

    useEffect(() => {
        const filial_id = props.match.params.id || null;

        const getRequestedFilial = async (id) => {
            const requested_filial = await getFilial(id);

            if (requested_filial) {
                const filial_activities = [];

                if (requested_filial.inserted) {
                    filial_activities.push(requested_filial.inserted);
                }

                if (requested_filial.updated) {
                    filial_activities.push(requested_filial.updated);
                }

                if (filial_activities.length > 0) {
                    setActivities(filial_activities);
                }

                if (requested_filial.fundacao) {
                    requested_filial.fundacao = ptBrDateToDateObject(requested_filial.fundacao);
                } else {
                    requested_filial.fundacao = '';
                }

                const filial_form = {
                    id: requested_filial.id,
                    fundacao: requested_filial.fundacao,
                    filial: requested_filial.filial,
                };

                setFilial(filial_form);
                setLoading(false);
            } else {
                props.history.push('/filial');
                error('Erro! Filial não encontrada!');
                setLoading(false);
            }
        };

        if (filial_id) {
            setLoading(true);
            getRequestedFilial(filial_id);
        }
    }, [props.match.params.id]);

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
                enableReinitialize
                validationSchema={Yup.object({
                    filial: Yup.string()
                        .required('Filial é obrigatório!'),
                    fundacao: Yup.mixed()
                        .validDate('Data de fundação inválida!'),
                })}
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting, resetForm, ...rest }) => {
                    const filial_to_save = {
                        ...values,
                    };

                    if (
                        filial_to_save.fundacao
                        && filial_to_save.fundacao !== ''
                    ) {
                        filial_to_save.fundacao = datePickerDateParser(filial_to_save.fundacao);
                    }

                    const result = await api.post('/filiais', {
                        filial: filial_to_save,
                    });

                    if (result.status === 200 && !filial_to_save.id) {
                        const { id } = result.data;
                        setSubmitting(false);
                        success('Filial cadastrada com sucesso!');
                        props.history.push(`/filial/${id}`);
                    } else if (result.status === 200 && filial_to_save.id) {
                        setSubmitting(false);
                        success('Filial atualizada com sucesso!');
                    } else {
                        setSubmitting(false);
                        error('Erro ao atualizar filial!');
                    }
                }}
            >
                {makeForm}
            </Formik>
        </Page>
    );
}

export default Form;
