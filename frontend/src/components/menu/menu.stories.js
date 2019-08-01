import React from 'react';

import {storiesOf} from '@storybook/react';
import Menu from './';

storiesOf('SubMenu', module)
    .addDecorator(story => <div style={{padding: '3rem'}}>{story()}</div>)
    .add('With Icon', () => <Menu collapsed='false' icon="icon-employee"/>)
    .add('Without Icon', () => <Menu collapsed='false'/>)
    .add('Clickable', () => <Menu collapsed='false' clickable icon="icon-employee"/>);


