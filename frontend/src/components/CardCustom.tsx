import React from 'react';
import {Flex} from 'antd';
import TableVisits from "./TableVisits";
import CustomDescription from "./CustomDescription";


const CardCustom: React.FC = () => {
    return (

        <>
            <Flex vertical style={{width: 700}}>
                <CustomDescription/>
                <TableVisits style={{margin: 4}}/>
            </Flex>;
        </>
    )
}



export default CardCustom;