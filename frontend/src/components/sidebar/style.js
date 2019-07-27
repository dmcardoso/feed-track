import styled  from 'styled-components';
import logo from '../../assets/img/logo.png';
import user from '../../assets/img/user.png';
import { parse } from '../../util/styled-components/font-size';
import {
    backgroundColor, textColor, widthSideBar, marginBottomCollapsedSideBar,
} from '../../configs/styled-components-options';

const Sidebar = styled('nav')`
    background-color: ${backgroundColor};
    box-shadow: 2px 0 15px rgba(0,0,0,.16);
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 30px 40px;
    position: relative;
    transition: .2s;
    width: ${widthSideBar};
`;

const Logo = styled('a')`
    align-self: center;
    background: url(${logo}) center / cover no-repeat;
    height: 47px;
    margin-bottom: ${marginBottomCollapsedSideBar};
    width: 57px;
`;

const UserImage = styled('div')`
    align-self: center;
    background: url(${user});
    border-radius: 50%;
    box-shadow: 0 3px 3px rgba(0,0,0,.16);
    height: 258px;
    margin-top: 34.3px;
    width: 258px;
`;

const UserName = styled('a')`
    align-self: center;
    color: ${textColor};
    font-size: ${parse(24)};
    font-weight: bold;
    margin-top: 4px;
    text-align: center;
    width: 258px;
`;

const BottomSideBar = styled('div')`
    bottom: 40px;
    display: flex;
    flex-direction: column;
    left: 40px;
    position: absolute;
    width: calc(100% - 80px);
`;

export {
    Sidebar, Logo, UserImage, UserName, BottomSideBar,
};
