import React from 'react';
import { Button,  Tooltip } from 'antd';
import {HomeOutlined} from "@ant-design/icons/lib";
import {Link} from "react-router-dom";
import {runInAction} from "mobx";
import {List} from "antd/es/list";

const HomeBtn: React.FC = () => {
    return (
        <Tooltip placement="top" title="Вернуться на главную">
           <Link style={{ fontSize: '32px', margin: 5}} to='/'>{<HomeOutlined/>}</Link>
        </Tooltip>
    )
} ;

export default HomeBtn;