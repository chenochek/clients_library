import React from 'react';
import {Flex} from 'antd';
import TableVisits from "./TableVisits";
import CustomDescription from "./CustomDescription";
import { useParams } from 'react-router-dom';
import SearchCustom from "./Search";


const CardCustom: React.FC = ({setIsOpenClientModal, setIsEdit, setIdClient, onClickAddVisit, setIdVisit, onClickEditVisit}) => {
    let { id } = useParams();
    return (

        <>
            <Flex vertical style={{width: 700}}>
                <CustomDescription onClickAddVisit={onClickAddVisit} setIsEdit={setIsEdit} setIdClient={setIdClient} setIsOpenClientModal={setIsOpenClientModal} id={id}/>
                <SearchCustom/>
                <TableVisits id={id} setIdVisit={setIdVisit} onClickEditVisit={onClickEditVisit}  style={{margin: 4}}/>
            </Flex>
        </>
    )
}



export default CardCustom;