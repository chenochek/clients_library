import React, {useEffect,  useState} from 'react';
import {Button, Descriptions} from 'antd';
import { DescriptionsProps } from 'antd';
import AddBtn from "./AddBtn";
import EditBtn from "./EditBtn";
import RootStore from "../stores/RootStore.jsx";
import formatDate from "../utils/formatDate.js"
import {observer} from "mobx-react";
import {getNameFile} from "../utils/getNameFile"


const CustomDescription = observer(({id, setIsOpenClientModal, setIsEdit,
                                        setIdClient, onClickAddVisit,
                                        setVisibleImage, setFilePath}) =>{
    const [items, setItems] = useState([]);
    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();
    const onClickEditClient = () => {
        setIsOpenClientModal(true);
        setIsEdit(true);
        setIdClient(id);
    }

    const onClickAgreement = () => {
        const agreement = ClientsStore.CurrentClient?.agreement
        if(!agreement) return;
        setVisibleImage(true)
        setFilePath(agreement)

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
                children: <Button type="link" onClick={onClickAgreement}>{getNameFile(results?.agreement || '')}</Button>,
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