import React from 'react';
import {Flex} from 'antd';
import TableVisits from "./TableVisits";
import CustomDescription from "./CustomDescription";
import { useParams } from 'react-router-dom';
import SearchCustom from "./Search";
import RootStore from "../stores/RootStore.jsx";


const CardCustom: React.FC = ({setIsOpenClientModal, setIsEdit, setIdClient, onClickAddVisit, setIdVisit,
                                  onClickEditVisit,  setFilePath,
                                  setVisibleImage }) => {

    const rootStore = RootStore();
    const {VisitStore} = rootStore.useStores();
    let { id } = useParams();
    return (

        <>
            <Flex vertical style={{maxWidth: 700, margin:'auto', marginTop: 0}}>
                <CustomDescription onClickAddVisit={onClickAddVisit}
                                   setIsEdit={setIsEdit}
                                   setIdClient={setIdClient}
                                   setIsOpenClientModal={setIsOpenClientModal}
                                   id={id}
                                   setFilePath={setFilePath}
                                   setVisibleImage={setVisibleImage}
                />
                <SearchCustom store={VisitStore}/>
                <TableVisits id={id}
                             setIdVisit={setIdVisit}
                             onClickEditVisit={onClickEditVisit}
                             style={{margin: 4}}
                             setFilePath={setFilePath}
                             setVisibleImage={setVisibleImage}
                />
            </Flex>
        </>
    )
}



export default CardCustom;