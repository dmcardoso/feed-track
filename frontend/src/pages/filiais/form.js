import React from 'react';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Main, MainContainer} from '../../components/app-container/style';

import ControlledInput from '../../components/controlled-input';
import ControlledDatePicker from '../../components/controlled-date-picker';

function Form(props) {
    function makeForm({handleSubmit}) {
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
                    component={ControlledDatePicker}
                />


                <button type="submit">Enviar</button>
            </form>
        );
    }

    return (
        <Main>
            <MainContainer>
                <div>Filial</div>
                <Formik
                    validationSchema={Yup.object({
                        filial: Yup.string()
                            .required('Filial é obrigatório!'),
                        fundacao: Yup.date('Data de fundação inválida')
                            .required('Fundacao é obrigatório!')
                    })}
                    initialValues={{
                        filial: '',
                        fundacao: null
                    }}
                    onSubmit={(values, actions) => {
                        console.log(values, actions);
                    }}
                >
                    {makeForm}
                </Formik>
            </MainContainer>
        </Main>
    );
}

export default Form;
