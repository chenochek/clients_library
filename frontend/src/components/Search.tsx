import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;



const SearchCustom: React.FC = () => (
    <Space direction="vertical">
        <Search placeholder="введите текст для поиска" style={{ width: 400, margin: 16 }}/>
    </Space>
);

export default SearchCustom;