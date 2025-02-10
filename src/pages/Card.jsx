import React from 'react'
import Plus from '../assets/plus.svg'
import Cards from '../components/Cards'
function Card() {
    return (
        <div className='items-center justify-center '>

            <div className=" xl:mt-[72px] xl:ml-[252px] flex  items-center  xl:gap-[267px] sm:gap-[81px]  gap-[81px] sm:mt-[34px] justify-between ml-5 mr-3  "  >
            <div className='sm:ml-[48px]'>
                <h3 className="text-[32px]  md:text-[32px] font-bold  md:pl-[48px]  sm:pl-[48px] ">
                    Invoices
                </h3>
                <p className=" sm:text-base text-gray-600  md:pl-[48px] sm:pl-[48px] ">
                    7  invoices

                </p>
            </div>
            <div className='flex justify-between sm:ml-[48-px] md:gap-[40px]  sm:mr-[48px] ml-3 w-[]'>
                <select className='dark:bg-[#0C0E16] p-3    xl:w-[190px] gap-3'>
                    <option value="all">All</option>
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="eror">eror</option>
                </select>

                <div className='flex items-center xl:gap-16 sm:[81px] w-[90px] bg-[#7C5DFA]  ml-2 h-[48px] raunded-xl rounded-[24px] p-[8]  xl:w-[150px] gap-[8px] sm:w-[90px] sm:h-[44px] '>
                    <img className='ml-2' src={Plus} alt="" />
                    <h3 className='text-[12px]'>New</h3>
                </div>

            </div>
            </div>
            <Cards></Cards>
        </div>





    )
}

export default Card
