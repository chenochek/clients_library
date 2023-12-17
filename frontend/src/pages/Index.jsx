import * as React from "react";
import {Flex} from "antd";
import SearchCustom from "../components/Search";
import AddBtn from "../components/AddBtn";
import ListCustom from "../components/List";
import ModalNewClient from "../components/ModalNewClient";
import {useState, useEffect} from "react";
import {runInAction} from "mobx";
import {observer} from 'mobx-react'
import RootStore from "../stores/RootStore.jsx";
import useHttp from "../hooks/useHttp.js";
import Urls from "../constants/url";
import {SortCustom} from "../components/SortCustom";


const IndexPage = observer(() => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const onClick = ()=> setIsOpenModal(true);

    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();
    const {getRequest} = useHttp();

    useEffect(() => runInAction(() => {
        ClientsStore.CurrentClient = null;
        getRequest({url: Urls().clients})
            .then(data => data["data"])
            .then(results => ClientsStore.Result = [...results])
    }), [])

    return (
        <>
            <Flex
                gap="small">
                <SearchCustom/>
                <AddBtn onClick={onClick} title="Добавить клиента"/>
                <SortCustom/>
            </Flex>
            <Flex gap="small" justify="space-around"
                  align="center"
                  wrap="wrap">
                <ListCustom/>
            </Flex>
            <ModalNewClient isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
        </>
    )
});

export default IndexPage;