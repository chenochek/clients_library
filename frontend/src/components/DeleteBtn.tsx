import React from 'react';
import { FloatButton } from 'antd';
import {DeleteOutlined} from "@ant-design/icons";

const DeleteBtn: React.FC = () =>
    <FloatButton shape="circle" type="primary" icon={<DeleteOutlined />}
                 tooltip={<div>Удалить клиента</div>}
                 style={{position: 'relative', insetInlineEnd: '0px', insetBlockEnd: '0px', margin: 4}}  />;

export default DeleteBtn;