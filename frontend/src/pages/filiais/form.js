import React from 'react';
import {Formik, Field} from "formik";
import {Main, MainContainer} from '../../components/app-container/style';

import ControlledInput from '../../components/controlled-input';
import Input from "../../components/input";

function Form(props) {
    function makeForm({handleSubmit}) {



        return (
            <form onSubmit={handleSubmit}>
                <Field
                    type="text"
                    icon="icon-email"
                    name="email"
                    placeholder="E-mail"
                    component={ControlledInput}
                />

                <button type="submit">Enviar</button>
            </form>
        )
    }

    return (
        <Main>
            <MainContainer>
                <div>Filial</div>
                <Formik
                    initialValues={{
                        email: 'suporte'
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
