import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import Page from '../../components/page';
import StyledCheckBoxGroup from '../../components/form-components/checkbox-group';
import ControlledInput from '../../components/controlled-input';

function Home(props) {
    function makeForm({ handleSubmit }) {
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    type="input_checkbox"
                    component={ControlledInput}
                    options={[
                        {
                            label: 'Apple',
                            value: 'apple',
                        },
                        {
                            label: 'Samsung',
                            value: 'samsung',
                        },
                    ]}
                    name="phones"
                />
                <button type="submit">envia</button>
            </form>
        );
    }

    return (
        <Page title="Bem Vindo">
            <Formik
                onSubmit={(values) => {
                    console.log(values);
                }}
                initialValues={{
                    phones: ['apple']
                }}
            >
                {makeForm}
            </Formik>
        </Page>
    );
}

export default Home;
