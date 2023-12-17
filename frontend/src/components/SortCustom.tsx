import React from 'react';
import { Select, Space } from 'antd';
import Tooltip from "antd/es/tooltip";
import RootStore from "../stores/RootStore.jsx";
import {runInAction} from "mobx";


const SortCustom: React.FC = () => {
    const rootStore = RootStore();
    const {ClientsStore} = rootStore.useStores();

    const handleChange = (value: string) => {
        runInAction(() => {
            if(value === 'fio') {
                ClientsStore.Result = ClientsStore.sortByFio()
            } else  {
                ClientsStore.Result = ClientsStore.sortByDate(value)
            }
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
                        { value: 'date_birth', label: 'Дню рождения' },
                        { value: 'last_visit', label: 'Последнему посещению' },
                    ]}
                />
            </Space>
        </Tooltip>
    )
};

export  {SortCustom};
