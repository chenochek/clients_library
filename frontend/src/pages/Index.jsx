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
import {CarouselCustom} from "../components/CarouselCustom"
import HomeBtn from "../components/HomeBtn";


const IndexPage = observer(() => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const onClick = ()=> setIsOpenModal(true);

    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();
    const {BirthStore} = rootStore.useStores();
    const {getRequest, postRequest} = useHttp();

    useEffect(() => runInAction(() => {
        ClientsStore.CurrentClient = null;
        getRequest({url: Urls().clients})
            .then(data => data["data"])
            .then(results =>{
                ClientsStore.Result = [...results]
                ClientsStore.Initial = [...results]
                ClientsStore.SortedArr = [...results]
            } );
        const today = new Date();
        postRequest({url: Urls().birthday, data: {
            dateBirth: today
            }})
            .then(response => response?.data)
            .then(result => BirthStore.Today = [...result])
            .catch(()=> {});

        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        postRequest({url: Urls().birthday, data: {
                dateBirth: tomorrow
            }})
            .then(response => response?.data)
            .then(result => BirthStore.Tomorrow = [...result])
            .catch(()=> {});

    }), [])

    return (
        <>
            <Flex
                gap="small">
                <HomeBtn/>
                <SearchCustom store={ClientsStore}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <AddBtn onClick={onClick} title="Добавить клиента"/>
                </div>
                <SortCustom/>
            </Flex>
            <Flex vertical gap="small">
                <CarouselCustom title="Дни рождения сегодня" color="#681c9445" slides={BirthStore.Today} />
                <CarouselCustom title="Дни рождения завтра" color="#211c9445" slides={BirthStore.Tomorrow}  />
            </Flex>
            <Flex gap="large" justify="flex-start"
                  align="flex-start"
                  wrap="wrap">
                <ListCustom/>
            </Flex>
            <ModalNewClient isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
        </>
    )
});

export default IndexPage;