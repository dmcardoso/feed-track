import styled from 'styled-components';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';

const StyledSelect = styled(ReactSelect)`
    input {
        font-weight: bold;
    }
`;
const StyledAsyncSelect = styled(AsyncSelect)`
    input {
        font-weight: bold;
    }
`;

export { StyledSelect, StyledAsyncSelect };
