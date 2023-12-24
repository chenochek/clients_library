import React, {useEffect, useState} from 'react';
import {Flex, List, Skeleton, Space} from 'antd';
import DeleteBtn from "./DeleteBtn";
import {observer} from 'mobx-react'
import {runInAction} from "mobx";
import RootStore from "../stores/RootStore.jsx";
import useHttp from "../hooks/useHttp.js";
import Urls from "../constants/url";
import {Link} from "react-router-dom";
import formatDate from "../utils/formatDate.js"
import {PaginationAlign, PaginationPosition} from "antd/es/pagination/Pagination";


const ListCustom: React.FC = observer(() => {
    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();

    const [position, setPosition] = useState<PaginationPosition>('bottom');
    const [align, setAlign] = useState<PaginationAlign>('center');



    return (
        <div
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
                maxWidth: 500,
                width: '100%',
                margin: 10
            }}
        >
            <List
                pagination={{ position, align, pageSize: 5}}
                itemLayout="vertical"
                dataSource={ClientsStore.Result}
                renderItem={(item) => (
                    <List.Item key={item.id} extra={<DeleteBtn id={item.id} title={`Удалить ${item.fio}`}
                                                               store={ClientsStore} url={Urls().clients}/>}>
                        <List.Item.Meta
                            title={<Link  onClick={()=>() => runInAction(()=> ClientsStore.CurrentClient = ClientsStore.getClientById(Number(item.id))) } to={`/clients/${item.id}`}>{item.fio}</Link>}
                            description={item.mobile}
                        />
                        <Flex vertical>
                            <div>{`Дата рождения: ${item.date_birth? formatDate(item.date_birth): ''}`}</div>
                            <div>{`Дата последнего посещения: ${item.last_visit? formatDate(item.last_visit) : ''}`}</div>
                        </Flex>
                    </List.Item>
                )}
            />
        </div>
    );
});

export default ListCustom;