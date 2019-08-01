import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
    Item, Icon, Description, Submenu, SubmenuList
} from './style';

function Menu(props) {
    const {collapsed, icon, clickable, hoverable, ...attrs} = props;

    const [submenuVisible, setSubmenuVisible] = useState(false);
    const itemRef = useRef(null);
    const descRef = useRef(null);
    const iconRef = useRef(null);

    const toggleVisible = (visible) => {
        setSubmenuVisible(!visible);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = (event, children = false) => {

        if (itemRef.current && !itemRef.current.contains(event.target)) { // In body
            toggleVisible(true);
        } else {
            if (!itemRef.current.contains(event.target)) {
                toggleVisible(submenuVisible);
            } else if (itemRef.current === event.target || event.target === descRef.current || children) {
                toggleVisible(submenuVisible);
            }
        }

    };

    const hover_events = {
        onMouseEnter() {
            toggleVisible(submenuVisible);
        },
        onMouseLeave() {
            toggleVisible(submenuVisible);
        }
    };

    const events = (clickable) ? null : {...hover_events};

    return (
        <Item {...attrs} {...events} ref={itemRef}>
            {icon && <Icon className={icon} ref={iconRef} onClick={(e) => handleClickOutside(e, true)}/>}
            {collapsed === 'false' && <Description ref={descRef}>Filiais</Description>}
            {submenuVisible &&
            (<Submenu>
                <SubmenuList>
                    <li>listar</li>
                    <li>editar</li>
                </SubmenuList>
            </Submenu>)
            }
        </Item>
    );
}

Menu.propTypes = {
    icon: PropTypes.string,
    clickable: PropTypes.bool,
    hoverable: PropTypes.bool,
};

Menu.defaultProps = {
    icon: null,
    clickable: false,
    hoverable: true
};

export default Menu;
