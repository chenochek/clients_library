import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ConfigProvider, theme} from "antd";

const {darkAlgorithm, compactAlgorithm} = theme;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#eb2f96",
                    "colorInfo": "#eb2f96"
                },
                "algorithm": [ compactAlgorithm]
            }
            }
        >
            <App type="primary"/>
        </ConfigProvider>
    </React.StrictMode>,
)
