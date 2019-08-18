import React from 'react';
import { SyncLoader } from 'react-spinners';
import { LoadContainer } from '../app-container/style';
import { colors } from '../../configs/styled-components-options';

function Loader(props) {
    return (
        <LoadContainer>
            <SyncLoader color={colors.green} />
        </LoadContainer>
    );
}

export default Loader;
