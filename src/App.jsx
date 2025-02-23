import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from './layouts/MainLayout'
import Card from './pages/Card.jsx';
import Cards from './components/Cards.jsx';
import CardDetails from './components/CardDetails.jsx'
import EditInvoice from "./components/EditInvoice";


export const ThemeContext = createContext();

function App() {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const body = document.body;
        if (theme === "light") {
            body.classList.remove("dark");
            body.classList.add("light")
        } else if (theme === "dark") {
            body.classList.remove("light");
            body.classList.add("dark");

        }
    }, [theme]);
    return (
        <div className='dark:bg-[#0C0E16] dark:text-[#F8F8FB] min-h-svh'>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <Routes>
                    <Route index element={<MainLayout><Card></Card></MainLayout>}></Route>
                    <Route path="/invoice/:id" element={<CardDetails />} />
                    <Route path="/edit-invoice/:id" element={<EditInvoice />} />



                </Routes>

            </ThemeContext.Provider>
        </div >

    )
}

export default App