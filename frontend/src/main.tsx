import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ConfigProvider, theme} from "antd";
import RootStore from "./stores/RootStore";
import dayjs from 'dayjs';
import ruRU from 'antd/locale/ru_RU';

const {darkAlgorithm, compactAlgorithm} = theme;
const rootStore = RootStore();
dayjs.locale('ru');

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            locale={ruRU}
            theme={{
                "token": {
                    "colorPrimary": "#eb2f96",
                    "colorInfo": "#eb2f96"
                },
                "algorithm": [compactAlgorithm]
            }
            }>
            <rootStore.StoreProvider>
                    <App type="primary"/>
            </rootStore.StoreProvider>
        </ConfigProvider>
    </React.StrictMode>,
)
