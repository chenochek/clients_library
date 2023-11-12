import {useState} from 'react'
import './App.css'
import * as React from "react";
import ListCustom from "./components/List";
import SearchCustom from "./components/Search";
import AddClientBtn from "./components/AddClientBtn";
import {Flex} from "antd";
import CardCustom from "./components/CardCustom";
import ModalNewClient from "./components/ModalNewClient";
import ModalNewVisit from "./components/ModalNewVisit";

function App() {
    const [count, setCount] = useState(0)

    return (

        <>
            <Flex gap="small">
                <SearchCustom/>
                <AddClientBtn/>
            </Flex>
            <Flex gap="small" justify="space-around" align="center" wrap="wrap">
                <ListCustom/>
                <CardCustom/>
            </Flex>
            <ModalNewClient/>
            <ModalNewVisit/>
        </>
    )
}

export default App
