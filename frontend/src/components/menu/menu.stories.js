import React from 'react';

import {storiesOf} from '@storybook/react';
import Menu from './';

storiesOf('SubMenu', module)
    .add('With Icon', () => <Menu collapsed='false' icon="icon-employee"/>)
    .add('Without Icon', () => <Menu collapsed='false'/>);


