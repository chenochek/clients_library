import React from 'react';
import { Button, Flex, Tooltip } from 'antd';
import {PlusOutlined} from "@ant-design/icons";

const AddClientBtn: React.FC = () => (
            <Tooltip placement="top" title="Добавить нового клиента">
                <Button type="primary" style={{ margin: 16 }} shape="circle" icon={<PlusOutlined />} />
            </Tooltip>
);

export default AddClientBtn;