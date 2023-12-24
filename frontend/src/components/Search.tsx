import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space } from 'antd';
import {SearchProps} from "antd/es/input/Search";
import {observer} from "mobx-react";

const { Search } = Input;



const SearchCustom: React.FC = observer(({store}) => {
    const onChange = (event) =>{
        const value = event.currentTarget.value;
        store.Result = value === ''?
             [...store.Initial]
            :[...store.getLiveSearchResult(value)]
    }
    return (
        <Space direction="vertical">
            <Search onKeyUp={onChange}  placeholder="введите текст для поиска" style={{ width: 400, margin: 16 }}/>
        </Space>
    )
}) ;

export default SearchCustom;