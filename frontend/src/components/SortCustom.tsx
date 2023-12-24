import React from 'react';
import { Select, Space } from 'antd';
import Tooltip from "antd/es/tooltip";
import RootStore from "../stores/RootStore.jsx";
import {runInAction} from "mobx";
import {observer} from "mobx-react";


const SortCustom: React.FC = observer(() => {
    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();

    const handleChange = (value: string) => {
        runInAction(() => {
            const order = value.split('-')
            console.log('sorted arr', ClientsStore.doSort(value))
            ClientsStore.Result = [...ClientsStore.doSort(order.length > 1 ? order[0] : value, order.length > 1 ? order[1] : null)];
        })

    };
    return  (
        <Tooltip placement="top" title="Сортировать по:">
            <Space wrap>
                <Select
                    defaultValue="ФИО"
                    style={{ width: 200 }}
                    onChange={handleChange}
                    options={[
                        { value: 'fio', label: 'ФИО' },
                        { value: 'last_visit-asc', label: 'Последнему посещению (убыв.)' },
                        { value: 'last_visit-desc', label: 'Последнему посещению (возраст.)' },
                    ]}
                />
            </Space>
        </Tooltip>
    )
});

export  {SortCustom};
