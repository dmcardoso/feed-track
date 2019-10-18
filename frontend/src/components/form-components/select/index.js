import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../../configs/styled-components-options';
import { parse } from '../../../util/styled-components/font-size';
import { StyledSelect, StyledAsyncSelect } from './style';
import {
    Container, ErrorMessage, Icon, InputContainer, Label,
} from '../common-style';

function Select({
    width, height, type_select, icon, label, error_message, name, margin, z_index, ...props
}) {
    const id = props.id || name;

    const show_label = label !== null;
    const show_error = error_message !== null;
    const show_icon = icon !== null;

    const addTheme = theme => (
        {
            ...theme,
            colors: {
                ...theme.colors,
                primary: colors.green,
                primary25: '#CDECDE',
                primary50: colors.green,
                primary75: colors.green,
            },
        }
    );

    const addCustomStyles = {
        control: (provided, state) => {
            const borderWidth = 1;
            const borderRadius = 10;
            const { menuIsOpen } = state;
            const boxShadow = '0 0 4px rgba(0,0,0,0.2)';
            let borderColor = menuIsOpen ? colors.green : 'transparent';
            borderColor = show_error ? colors.red : borderColor;

            return {
                ...provided,
                boxShadow,
                borderWidth,
                borderRadius,
                borderColor,
            };
        },
        container: (provided, state) => ({
            ...provided,
            width,
            height: 'auto',
        }),
        input: (provided, state) => ({
            ...provided,
            height: '52px',
            fontSize: parse(20),
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            paddingLeft: show_icon ? '54px' : '0',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            fontSize: parse(20),
            fontWeight: 'bold',
            paddingLeft: show_icon ? '54px' : '0',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            fontSize: parse(20),
            fontWeight: 'bold',
            paddingLeft: show_icon ? '54px' : '0',
        }),
        menu: (provided, state) => ({
            ...provided,
            zIndex: 3,
        }),
    };

    const attrs = {
        id,
        name,
        ...props,
    };

    const ReactStyledSelect = type_select === 'async' ? StyledAsyncSelect : StyledSelect;

    return (
        <Container width={width} margin={margin}>
            {show_label && <Label htmlFor={id || name}>{label}</Label>}
            <InputContainer height={height}>
                {show_icon && <Icon className={icon} z_index={z_index} />}
                <ReactStyledSelect
                    {...attrs}
                    theme={addTheme}
                    styles={addCustomStyles}
                />
                {show_error && <ErrorMessage title={error_message}>{error_message}</ErrorMessage>}
            </InputContainer>
        </Container>
    );
}

Select.propTypes = {
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isSearchable: PropTypes.bool,
    loadingMessage: PropTypes.func,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    options: PropTypes.array,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    type_select: PropTypes.string,
    width: PropTypes.string,
    z_index: PropTypes.number,
    height: PropTypes.string,
    margin: PropTypes.string,
    icon: PropTypes.string,
    error_message: PropTypes.string,
};

Select.defaultProps = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isSearchable: true,
    loadingMessage: () => 'Carregando eesultados...',
    noOptionsMessage: () => 'Nenhum resultado encontrado',
    id: null,
    onChange: null,
    onKeyDown: null,
    type_select: '',
    width: '100%',
    height: 'auto',
    margin: null,
    z_index: 2,
    icon: null,
    error_message: null,
    options: [],
};


export default Select;
