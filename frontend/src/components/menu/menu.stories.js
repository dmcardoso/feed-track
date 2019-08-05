import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from '.';

const simpleSubmenu = [
    {
        description: 'Editar',
        marginBottom: '10',
    },
    {
        description: 'Visuailizar',
    },
];


const iconSubmenu = [
    {
        description: 'Editar',
        icon: 'icon-edit',
        marginBottom: '10',
        onClick() {
            console.log('clicked in item submenu 1');
        },
    },
    {
        description: 'Enviar',
        icon: 'icon-email',
        onClick() {
            console.log('clicked in item submenu 2');
        },
    },
];

const simpleItens = [
    {
        description: 'Filiais',
        marginBottom: '20',
    },
    {
        description: 'Funcionarios',
        marginBottom: '20',
    },
];

const iconItens = [
    {
        description: 'Filiais',
        marginBottom: '20',
        icon: 'icon-company',
        onClick() {
            console.log('clicked in item 1');
        },
    },
    {
        description: 'Funcionarios',
        marginBottom: '20',
        icon: 'icon-employee',
        onClick() {
            console.log('clicked in item 2');
        },
    },
];


storiesOf('SubMenu', module)
    .addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
    .add('Simple Itens', () => (
        <>
            {simpleItens.map(item => (<Menu collapsed="false" {...item} key={item.description} />))}
        </>
    ))
    .add('Icon Itens - clickable', () => (
        <>
            {iconItens.map(item => (<Menu collapsed="false" clickable {...item} key={item.description} />))}
        </>
    ))
    .add('Icon Itens - collabpsed', () => (
        <>
            {iconItens.map(item => (<Menu collapsed="true" {...item} key={item.description} />))}
        </>
    ))
    .add('Icon Itens - Simple Submenu', () => (
        <>
            {iconItens.map(item => (<Menu collapsed="false" key={item.description} {...item} submenu={simpleSubmenu} />))}
        </>
    ))
    .add('Icon Itens - Icon Submenu', () => (
        <>
            {iconItens.map(item => (<Menu collapsed="true" {...item} key={item.description} clickable submenu={iconSubmenu} />))}
        </>
    ))
    .add('Circle Item - Icon Submenu', () => (
        <>
            <Menu collapsed="false" description="..." circle clickable submenu={iconSubmenu} />
        </>
    ))
    .add('Circle Item - Simple Submenu', () => (
        <>
            <Menu collapsed="false" description="..." circle submenu={simpleSubmenu} />
        </>
    ));
