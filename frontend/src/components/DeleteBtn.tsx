import React from 'react';
import { FloatButton, Popconfirm} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {observer} from 'mobx-react'
import {runInAction} from "mobx";
import useHttp from "../hooks/useHttp.js";

const DeleteBtn = observer( ({id, title = "Удалить", store, url}) => {
        const {deleteRequest} = useHttp();


        const onConfirm = () => {
            runInAction(() => {
                deleteRequest({url: `${url}/${id}`})
                    .then(data => data["data"])
                    .then(results =>{
                       store.deleteById(id)
                    })
                    .catch(error => {
                        console.log('error', error)
                    });
            });
        };

        return (
            <>
                <Popconfirm
                    onConfirm={onConfirm}
                    description="Вы уверены, что хотите удалить?"
                    okText="Да"
                    cancelText="Нет">
                    <FloatButton shape="circle" type="primary" icon={<DeleteOutlined/>}
                                 tooltip={<div>{title}</div>}
                                 style={{position: 'relative', insetInlineEnd: '0px', insetBlockEnd: '0px', margin: 4}} />
                </Popconfirm>
            </>
        )
    }
);


export default DeleteBtn;