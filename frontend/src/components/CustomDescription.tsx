import React from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd';
import AddClientBtn from "./AddClientBtn";
import EditBtn from "./EditBtn";

const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'ФИО',
        children: 'Гончарук Алеся Юрьевна',
    },
    {
        key: '2',
        label: 'Телефон',
        children: '+375297051388',
    },
    {
        key: '3',
        label: 'Соглашение',
        children: 'соглашение.png',
    },
    {
        key: '4',
        label: '',
        children:<AddClientBtn/>,
    },
    {
        key: '5',
        label: '',
        children:<EditBtn/>,
    },
];

const CustomDescription: React.FC = () => <Descriptions title="Информация о клиенте" items={items} style={{margin: 8}}/>;

export default CustomDescription;