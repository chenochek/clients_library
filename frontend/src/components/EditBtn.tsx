import React from 'react';
import { Button, Flex, Tooltip } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {EditOutlined} from "@ant-design/icons/lib";

const EditBtn: React.FC = ({onClick, title}) => (
    <Tooltip placement="top" title={title}>
        <Button type="primary" onClick={onClick} style={{ margin: 4, width: 35, height: 35 }} shape="circle" icon={<EditOutlined /> } />
    </Tooltip>
);

export default EditBtn;