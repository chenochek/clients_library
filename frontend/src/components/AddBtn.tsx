import React, {useEffect} from 'react';
import { Button, Flex, Tooltip } from 'antd';
import {PlusOutlined} from "@ant-design/icons";

const AddBtn: React.FC = ({onClick, id =null, isEdit = false, title}) => {
    return (
        <Tooltip placement="top" title={title}>
            <Button onClick={onClick} type="primary" style={{ margin: 16 }} shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
    )
} ;

export default AddBtn;