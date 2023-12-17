import React, {useEffect, useRef, useState} from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd';
import AddBtn from "./AddBtn";
import EditBtn from "./EditBtn";
import RootStore from "../stores/RootStore.jsx";
import useHttp from "../hooks/useHttp.js";
import Urls from "../constants/url";
import formatDate from "../utils/formatDate.js"
import {observer} from "mobx-react";
import {getNameFile} from "../utils/getNameFile.js"


const CustomDescription = observer(({id, setIsOpenClientModal, setIsEdit, setIdClient, onClickAddVisit}) =>{
    const [items, setItems] = useState([]);
    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();
    const onClickEditClient = () => {
        setIsOpenClientModal(true);
        setIsEdit(true);
        setIdClient(id);
    }
    const loadClientInfo = () => {
        const results = ClientsStore.CurrentClient;
        setItems([
            {
                key: '1',
                label: 'ФИО',
                children: results?.fio,
            },
            {
                key: '2',
                label: 'Телефон',
                children: results?.mobile,
            },
            {
                key: '3',
                label: 'Соглашение',
                children: getNameFile(results?.agreement || ''),
            },
            {
                key: '4',
                label: 'День рождения',
                children: results?.date_birth ? formatDate(results?.date_birth ) : null,
            },
            {
                key: '5',
                label: '',
                children: <AddBtn title={"Добавить посещение"} onClick={onClickAddVisit}/>,
            },
            {
                key: '6',
                label: '',
                children: <EditBtn title={"Редактировать информацию о клиенте"} onClick={onClickEditClient}/>,
            },
        ]);
    }


    useEffect(()=> {
        loadClientInfo();
    }, []);
    useEffect(()=> {
        loadClientInfo();
    }, [ClientsStore.CurrentClient]);

    return (
        <Descriptions title="Информация о клиенте" items={items} style={{margin: 8}}/>
    )
})

export default CustomDescription;