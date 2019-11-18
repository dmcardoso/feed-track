import React from 'react';
import { SyncLoader } from 'react-spinners';
import { Container } from './style';
import { colors } from '../../configs/styled-components-options';

function TableLoader({ loading }) {
    return (
        <Container loadingActive={loading}>
            <SyncLoader color={colors.green} />
        </Container>
    );
}

export default TableLoader;
