import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Item, Icon, Description, Submenu, SubmenuList, StyledLink, Container,
} from './style';


function Menu(props) {
    const {
        collapsed, icon, clickable, hoverable, hover_color, description, submenu, as, link, ...attrs
    } = props;

    const [submenuVisible, setSubmenuVisible] = useState(false);
    const itemRef = useRef(null);
    const descRef = useRef(null);

    const toggleVisible = (visible) => {
        setSubmenuVisible(!visible);
    };

    useEffect(() => {
        if (clickable) {
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    });

    const handleClickOutside = (event, children = false) => {
        if (itemRef.current && !itemRef.current.contains(event.target)) { // In body
            toggleVisible(true);
        } else if (!itemRef.current.contains(event.target)) {
            toggleVisible(submenuVisible);
        } else if (itemRef.current === event.target || event.target === descRef.current || children) {
            toggleVisible(submenuVisible);
        }
    };

    const hover_events = {
        onMouseEnter() {
            toggleVisible(false);
        },
        onMouseLeave() {
            toggleVisible(true);
        },
    };

    const events = (clickable && !link) ? null : { ...hover_events };

    const item_attrs = {
        hover_color,
        to: link,
    };

    const Component = link ? StyledLink : Item;

    return (
        <Container {...attrs} icon={icon} {...events} as={as}>
            <Component {...item_attrs} ref={itemRef}>
                {icon && <Icon className={icon} onClick={e => clickable && handleClickOutside(e, true)} />}
                {collapsed === 'false' && <Description ref={descRef}>{description}</Description>}
            </Component>
            {submenuVisible && submenu.length > 0 && (
                <Submenu>
                    <SubmenuList>
                        {submenu.map(({ icon: icon_submenu, description: description_subitem, ...attrs_submenu }) => (
                            <Item
                                marginBottom={10}
                                key={description_subitem}
                                icon={icon_submenu}
                                height="auto"
                                {...attrs_submenu}
                            >
                                {icon_submenu && <Icon className={icon_submenu} width={27} margin_right={15} />}
                                <Description font_size={18}>{description_subitem}</Description>
                            </Item>
                        ))}
                    </SubmenuList>
                </Submenu>
            )
            }
        </Container>
    );
}

Menu.propTypes = {
    icon: PropTypes.string,
    clickable: PropTypes.bool,
    collapsed: PropTypes.string,
    hoverable: PropTypes.bool,
    hover_color: PropTypes.string,
    description: PropTypes.string.isRequired,
    submenu: PropTypes.array,
    link: PropTypes.string,
    as: PropTypes.string,
};

Menu.defaultProps = {
    icon: null,
    clickable: false,
    collapsed: 'false',
    hoverable: true,
    hover_color: null,
    submenu: [],
    link: null,
    as: 'li',
};

export default Menu;
