import React, { useState } from 'react';

import PropTypes from 'prop-types';
import {
    StyledCheckBox, Container, ErrorMessage, Label, HiddenCheckBox, Icon,
} from './style';

function CheckBox(props) {
    const {
        margin, width, error_message, label, name, id, value, defaultChecked, onChange, ...attrs
    } = props;

    let checkboxRef = null;

    const createRef = (ref) => {
        checkboxRef = ref;
    };

    const [checkedBox, setCheckedBox] = useState(defaultChecked || false);

    const show_error = error_message !== null;

    const input_attrs = {
        name,
        id: id || name,
        defaultChecked: checkedBox,
        value,
        ...attrs,
    };

    const container_attrs = {
        checked: checkedBox,
        show_error,
        onClick(e) {
            setCheckedBox(!checkedBox);
            checkboxRef.checked = !checkboxRef.checked;

            if (onChange) {
                onChange(checkboxRef);
            }
        },
    };

    const label_attrs = {
        onClick(e) {
            setCheckedBox(!checkedBox);
            checkboxRef.checked = !checkboxRef.checked;

            if (onChange) {
                onChange(checkboxRef);
            }
        },
    };

    return (
        <Container margin={margin} width={width}>
            <StyledCheckBox {...container_attrs}>
                <HiddenCheckBox attrs={input_attrs} ref={ref => createRef(ref)} />
                {checkedBox && <Icon className="icon-checked" />}
            </StyledCheckBox>
            <Label {...label_attrs}>{label}</Label>
            {show_error && <ErrorMessage title={error_message}>{error_message}</ErrorMessage>}
        </Container>
    );
}

CheckBox.propTypes = {
    width: PropTypes.string,
    error_message: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    defaultChecked: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    margin: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
};

CheckBox.defaultProps = {
    width: '100%',
    id: null,
    margin: null,
    error_message: null,
    value: null,
    onChange: null,
    defaultChecked: false,
    label: null,
};


export default CheckBox;
