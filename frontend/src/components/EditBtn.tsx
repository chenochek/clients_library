import React from 'react';
import { Button, Flex, Tooltip } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {EditOutlined} from "@ant-design/icons/lib";

const EditBtn: React.FC = () => (
    <Tooltip placement="top" title="Редактировать информацию">
        <Button type="primary" style={{ margin: 16 }} shape="circle" icon={<EditOutlined /> } />
    </Tooltip>
);

export default EditBtn;