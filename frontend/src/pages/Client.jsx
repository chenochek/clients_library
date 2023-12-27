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
import {useParams, useLocation} from 'react-router-dom';
import {SortCustom} from "../components/SortCustom";
import {ImageModal} from "../components/ImageModal";
import {CarouselCustom} from "../components/CarouselCustom";
import HomeBtn from "../components/HomeBtn";

const ClientPage = observer(() => {
    const [isOpenModalClient, setIsOpenModalClient] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idClient, setIdClient] = useState(useParams().id);

    const [isOpenModalVisit, setIsOpenModalVisit] = useState(false);
    const [isEditVisit, setIsEditVisit] = useState(false);
    const [idVisit, setIdVisit] = useState(null);

    const [visibleImage, setVisibleImage] = useState(false)
    const [filePath, setFilePath] = useState('')

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
    const {getRequest, postRequest} = useHttp();
    const {BirthStore} = rootStore.useStores();

    const location = useLocation();

    useEffect(() => runInAction(() => {
        getRequest({url: Urls().clients})
            .then(data => data["data"])
            .then(results => {
                ClientsStore.Result = [...results]
                ClientsStore.Initial = [...results]
                ClientsStore.SortedArr = [...results]
            })
            .then(() => {
                ClientsStore.CurrentClient = ClientsStore.getClientById(Number(idClient))
            })


        const today = new Date();

        if (BirthStore.Today.length <= 0) {
            postRequest({
                url: Urls().birthday, data: {
                    dateBirth: today
                }
            })
                .then(response => response?.data)
                .then(result => BirthStore.Today = [...result])
                .catch(() => {
                });
        }

        if (BirthStore.Tomorrow.length <= 0) {
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            postRequest({
                url: Urls().birthday, data: {
                    dateBirth: tomorrow
                }
            })
                .then(response => response?.data)
                .then(result => BirthStore.Tomorrow = [...result])
                .catch(() => {
                });
        }


    }), []);

    useEffect(() => {
        const idArr = location.pathname.split('/')
        const newId = idArr[idArr.length - 1];
        setIdClient(newId)
        runInAction(() => ClientsStore.CurrentClient = ClientsStore.getClientById(Number(newId)))
    }, [location])


    return (
        <>
            <Flex
                gap="small">
                <HomeBtn/>
                <SearchCustom store={ClientsStore}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <AddBtn onClick={onClickAddClient} title="Добавить клиента"/>
                </div>
                <SortCustom/>
            </Flex>
            <Flex vertical gap="small">
                <CarouselCustom title="Дни рождения сегодня" color="#681c9445" slides={BirthStore.Today}/>
                <CarouselCustom title="Дни рождения завтра" color="#211c9445" slides={BirthStore.Tomorrow}/>
            </Flex>
            <Flex gap="large" justify="flex-start"
                  align="flex-start"
                  wrap="wrap">
                <ListCustom/>
                <CardCustom
                    visibleImage={visibleImage} setVisibleImage={setVisibleImage}
                    setFilePath={setFilePath}
                    setIdVisit={setIdVisit}
                    onClickEditVisit={onClickEditVisit} onClickAddVisit={onClickAddVisit}
                    setIsOpenClientModal={setIsOpenModalClient}
                    setIsEdit={setIsEdit}
                    setIdClient={setIdClient}/>
            </Flex>
            <ModalNewClient isOpen={isOpenModalClient} isEdit={isEdit} id={idClient} setIsOpen={setIsOpenModalClient}/>
            <ModalNewVisit isOpen={isOpenModalVisit} isEdit={isEditVisit} setIsOpen={setIsOpenModalVisit}
                           idVisit={idVisit}
                           onClickEditVisit={onClickEditVisit}
                           setIdVisit={setIdVisit}
                           setVisibleImage={setVisibleImage}
                           setFilePath={setFilePath}
            />
            <ImageModal filePath={filePath} visible={visibleImage} setVisible={setVisibleImage}/>
        </>
    )
})

export default ClientPage;