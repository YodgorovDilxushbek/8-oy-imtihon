import React, { useContext, useEffect, useState } from 'react';
import User from '../assets/Oval.png';
import Logo from '../assets/logo1.svg';
import { ThemeContext } from '../App';

function MainLayout({children}) {
    const { theme, setTheme } = useContext(ThemeContext);

    function handleClickTheme() {
        if (theme === "light") {
            setTheme("dark")
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light")
            localStorage.setItem("theme","light");
        }
    }
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);
    return (
        <div className='xl:flex'>
            <div className="sm:max-w-[800px] md:max-w-[1024px]  xl:flex-col xl:max-w-[103px] xl:rounded-tr-[29px]  xl:rounded-br-[29px] xl:h-dvh xl:raunded-2xl   lg:max-w-[1424px] w-full h-[80px] flex items-center justify-between bg-[#373B53]  ">
            <img src={Logo} alt="Logo" className="  sm:h-[64px] md:h-[72px] xl:max-w-[103px] xl:h-[103px]" />

            <div className=" flex gap-[49px] md:justify-between sm:justify-between xl:flex-col xl:items-center ">
                <button className="w-[32px] h-[32px] flex items-center justify-center " onClick={handleClickTheme}>
                    {theme === "light" ? "🌙" : "🔅"}
                </button>

                <img src={User} alt="User" className="w-[32px] h-[32px] xl:max-w-[40px] xl:max-h-[40px] xl:text-center   " />
            </div>
        </div>
                <div className='container' >{children}</div> 
        </div> 

    );
}

export default MainLayout;
