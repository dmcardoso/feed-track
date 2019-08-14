import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Main, MainContainer } from '../../components/app-container/style';

import ControlledInput from '../../components/controlled-input';
import StyledDatePicker from '../../components/form-components/date-picker';

function Form(props) {
    function makeForm({ handleSubmit }) {
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


                <button type="submit">Enviar</button>
            </form>
        );
    }

    return (
        <Main>
            <MainContainer>
                <div>Filial</div>
                <StyledDatePicker
                    calendarAriaLabel="Testeeee"
                    clearAriaLabel="Limpar"
                    dayAriaLabel="Dia"
                    format="dd/MM/yy"
                    label="Oloco"
                    calendarIcon={null}
                    clearIcon={null}
                    icon="icon-calendar"
                    value={new Date()}
                    onChange={date => console.log(date.toLocaleDateString())}
                />
                <Formik
                    validationSchema={Yup.object({
                        filial: Yup.string()
                            .required('Filial é obrigatório!'),
                    })}
                    initialValues={{
                        filial: '',
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
