import './App.css'
import * as React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import IndexPage from "./pages/Index";
import ClientPage from "./pages/Client";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage/>}/>
                    <Route path="/clients/:id" element={<ClientPage/>}/>
                    <Route
                        path="*"
                        element={
                            <main style={{padding: "1rem", margin: "auto", textAlign: "center"}}>
                                <h1>Такой страницы не существует!</h1>
                            </main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
