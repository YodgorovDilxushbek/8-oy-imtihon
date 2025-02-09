import React, { useContext, useEffect, useState } from 'react';
import User from '../assets/Oval.png';
import Logo from '../assets/logo1.svg';
import { ThemeContext } from '../App';

function Layout() {
    const { theme, setTheme } = useContext(ThemeContext);

    function handleClickTheme() {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <div className="sm:w-[375px] flex items-center   bg-[#373B53] gap-[178px] ">
            <img src={Logo} alt="Logo" className="w-[72px] h-[72px]" />
            <div className='flex gap-[129px]'>
                <button className='w-[20px] h-[20px] ' onClick={handleClickTheme}>
                    {theme === "light" ? "🌙 " : "🔅"}
                </button>

                <img src={User} alt="User" className="w-[32px] h-[32px]   " />
            </div>
        </div>
    );
}

export default Layout;
