import React, { useEffect, useState, createContext } from 'react'
import MainLayout from './layouts/MainLayout'

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
        <div className='dark:bg-[#0C0E16]'>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <MainLayout>

                </MainLayout>

            </ThemeContext.Provider>
        </div>
    )
}

export default App