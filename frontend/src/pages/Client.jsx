import * as React from "react";
import {Flex} from "antd";
import SearchCustom from "../components/Search";
import AddBtn from "../components/AddBtn";
import ListCustom from "../components/List";
import CardCustom from "../components/CardCustom";
import ModalNewVisit from "../components/ModalNewVisit";
import ModalNewClient from "../components/ModalNewClient";
import {useState, useEffect} from "react";
import {runInAction} from "mobx";
import {observer} from 'mobx-react'
import RootStore from "../stores/RootStore.jsx";
import useHttp from "../hooks/useHttp.js";
import Urls from "../constants/url";
import { useParams, useLocation  } from 'react-router-dom';
import {SortCustom} from "../components/SortCustom";

const ClientPage = observer(() => {
    const [isOpenModalClient, setIsOpenModalClient] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idClient, setIdClient] = useState(useParams().id);

    const [isOpenModalVisit, setIsOpenModalVisit] = useState(false);
    const [isEditVisit, setIsEditVisit] = useState(false);
    const [idVisit, setIdVisit] = useState(null);

    const onClickAddClient = () => {
        setIsOpenModalClient(true);
        setIsEdit(false);
        setIdClient(null);
    }

    const onClickAddVisit = () => {
        setIsOpenModalVisit(true);
        setIsEditVisit(false);
        setIdClient(null);
    };

    const onClickEditVisit = () => {
        setIsEditVisit(true);
        setIsOpenModalVisit(true)
    }

    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();
    const {getRequest} = useHttp();

    const location = useLocation();

    useEffect(() => runInAction(() => {
        getRequest({url: Urls().clients})
            .then(data => data["data"])
            .then(results => ClientsStore.Result = [...results])
            .then(() => {
                ClientsStore.CurrentClient = ClientsStore.getClientById(Number(idClient))})

    }), []);

    useEffect(()=> {
        const idArr = location.pathname.split('/')
        const newId = idArr[idArr.length - 1];
        setIdClient(newId)
        runInAction(()=> ClientsStore.CurrentClient = ClientsStore.getClientById(Number(newId)))
    }, [location])


    return (
        <>
            <Flex
                gap="small">
                <SearchCustom/>
                <AddBtn onClick={onClickAddClient} title="Добавить клиента"/>
                <SortCustom/>
            </Flex>
            <Flex gap="small" justify="space-around"
                  align="center"
                  wrap="wrap">
                <ListCustom/>
                <CardCustom setIdVisit={setIdVisit}
                    onClickEditVisit={onClickEditVisit} onClickAddVisit={onClickAddVisit}
                            setIsOpenClientModal={setIsOpenModalClient}
                            setIsEdit={setIsEdit}
                            setIdClient={setIdClient}/>
            </Flex>
            <ModalNewClient isOpen={isOpenModalClient} isEdit={isEdit} id={idClient} setIsOpen={setIsOpenModalClient}/>
            <ModalNewVisit isOpen={isOpenModalVisit} isEdit={isEditVisit} setIsOpen={setIsOpenModalVisit} idVisit={idVisit}
            onClickEditVisit={onClickEditVisit}
            setIdVisit={setIdVisit}/>
        </>
    )
})

export default ClientPage;