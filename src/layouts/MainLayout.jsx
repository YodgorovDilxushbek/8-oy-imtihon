import React, { useContext, useEffect, useState } from 'react';
import User from '../assets/Oval.png';
import { MdDarkMode } from "react-icons/md";

import Logo from '../assets/logo1.svg';
import { CiLight } from "react-icons/ci";

import { ThemeContext } from '../App';

function MainLayout({ children }) {
    const { theme, setTheme } = useContext(ThemeContext);

    function handleClickTheme() {
        if (theme === "light") {
            setTheme("dark")
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light")
            localStorage.setItem("theme", "light");
        }
    }
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);
    return (
        <div className='xl:flex     '>
            <div className="md:max-w-[1284px] md:h-[80px] flex items-center justify-between bg-[#373B53] dark:bg-[#1E2139] xl:flex-col xl:max-w-[103px] w-[100%] xl:h-dvh xl:rounded-tr-[29px] xl:rounded-br-[29px] xl:fixed xl:top-0 xl:left-0 xl:bottom-0">
                <img draggable={false}
                    src={Logo}
                    className="xl:max-w-[103px] w-[80px] xl:w-[100%] max-h-[103px] h-[100%] select-none"
                    alt=""
                />
                <div className="flex gap-[49px] md:justify-between sm:justify-between p-6 xl:flex-col xl:items-center">
                    <div className="cursor-pointer" onClick={handleClickTheme}>
                        {theme === "light" ? <CiLight size={20} /> : <MdDarkMode size={20} />}
                    </div>
                    <div className="content-[''] border-[2px] border-[#494E6E] "></div>
                    <img width={32} height={32} src={User} className="" alt="" />
                </div>
            </div>
            <div className='container' >{children}</div>
        </div>


    );
}

export default MainLayout;

