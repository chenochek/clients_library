import React, {useEffect} from 'react';
import {Button, Flex, List, Table} from 'antd';
import { ColumnsType } from 'antd/es/table';
import VisitType from "../types/visitType";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import RootStore from "../stores/RootStore.jsx";
import useHttp from "../hooks/useHttp.js";
import Urls from "../constants/url";
import {runInAction} from "mobx";
import {observer} from 'mobx-react';
import formatDate from "../utils/formatDate.js"
import {getNameFile} from "../utils/getNameFile.js"


const columns: ColumnsType<VisitType> = [
    {
        title: 'Дата',
        dataIndex: 'date_format',
        key: 'date_format',
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
        dataIndex: 'comment',
        key: 'comment',
    },
    {
        title: 'Фото',
        dataIndex: 'photo_name',
        key: 'photo_name',
    },
    {
        title: 'Действие',
        key: 'action',
        dataIndex: 'action',
    }
];


const TableVisits: React.FC = observer(({id, setIdVisit, onClickEditVisit,  setFilePath,
                                            setVisibleImage}) => {
    const rootStore = RootStore();
    const {VisitStore} = rootStore.useStores();
    const {getRequest} = useHttp();


    const onClickPhoto = (photo) => {
        return () => {
            if(!photo) return;
            setVisibleImage(true)
            setFilePath(photo)
        }

    }

    const loadData = () => {
        getRequest({url: `${Urls().visits}/${id}`})
            .then(data => data["data"])
            .then(results =>{
                results = results.map(item => {
                    return {...item, key : item.id, action : <Flex><EditBtn  title="Редактировать сведения о посещении" onClick={() => {
                        setIdVisit(Number(item.id))
                        onClickEditVisit();
                    }
                        }/><DeleteBtn  id={item.id} store={VisitStore} url={Urls().visits}/></Flex>,
                        date_format: item.date ? formatDate(item.date) : null,
                        photo_name:  <Button onClick={onClickPhoto(item.photo)} type='link'> {getNameFile(item.photo || '')}</Button>,
                    }
                });
                VisitStore.Result = [...results]
            } )
            .catch(error => console.log(error))
    };


    useEffect(()=> runInAction(() => loadData()), [])
    useEffect(()=> runInAction(() => loadData()), [id])
    return (
        <Table  pagination={{pageSize: 5}} columns={columns} dataSource={VisitStore.sortByDateDesc()} />
    )
})

export default TableVisits;