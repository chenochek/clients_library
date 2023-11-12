import React from 'react';
import { Table} from 'antd';
import { ColumnsType } from 'antd/es/table';
import VisitType from "../types/visitType";
import DeleteBtn from "./DeleteBtn";


const columns: ColumnsType<VisitType> = [
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Продолжительность',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Стоимость',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Комментарий',
        dataIndex: 'comments',
        key: 'comments',
    },
    {
        title: 'Действие',
        key: 'action',
        dataIndex: 'action',
        render: (_) => (<DeleteBtn/>),
    }
];

const data: VisitType[] = [
    {
        key: '1',
        date: '11.11.2023',
        duration: '1.5 часа',
        price: '16 рублей',
        comments: 'Опаздывает на 10 минут',
    },
    {
        key: '2',
        date: '11.11.2011',
        duration: '1 час',
        price: '160 рублей',
        comments: 'Чувствительная кожа',
    },
    {
        key: '3',
        date: '11.11.2023',
        duration: '1.5 часа',
        price: '16 рублей',
        comments: 'Опаздывает на 10 минут',
    },
];

const TableVisits: React.FC = () => <Table columns={columns} dataSource={data} />;

export default TableVisits;