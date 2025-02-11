import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import new1 from "../assets/images/new1.svg";
import invois from "../assets/images/invois.png";
import data from "../assets/data/data.json";
import Plus from '../assets/plus.svg'

function Cards() {
    const navigate = useNavigate();

    const [filterStatus, setFilterStatus] = useState("Filter by status");

    const filtereddata =
        filterStatus === "Filter by status"
            ? data
            : data.filter((invoice) => invoice.status === filterStatus.toLowerCase());

    const handleNavigate = (invoiceId) => {
        navigate(`/invoice/${invoiceId}`);
    };

    return (
        <div
            className={` min-h-screen flex flex-col items-center justify-start px-6 pb-6 md:pl-24 sm:pl-8`}
        >
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <div>
                    <h1
                        className={` sm:text-3xl font-spartan font-bold`}
                    >
                        Invoices
                    </h1>
                    <p
                        className={` font-spartan font-medium text-slate-400`}
                    >
                        {filtereddata.length} invoices
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <select
                        id="status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={` font-spartan font-bold blockflex justify-between sm:ml-[48-px] md:gap-[40px]  sm:mr-[48px] ml-3  dark:bg-black dark:text-white`}
                    >
                        <option value="Filter by status" className="font-spartan font-bold sm:text-base text-sm">
                            Filter by status
                        </option>
                        <option value="Draft" className="font-spartan font-bold sm:text-base text-sm">
                            Draft
                        </option>
                        <option value="Pending" className="font-spartan font-bold sm:text-base text-sm">
                            Pending
                        </option>
                        <option value="Paid" className="font-spartan font-bold sm:text-base text-sm">
                            Paid
                        </option>
                    </select>

                    <div className='flex items-center xl:gap-16 sm:[81px]  w-[90px] bg-[#7C5DFA]  ml-2 h-[48px] raunded-xl rounded-[24px] p-[8] mr-0  xl:w-[150px] gap-[8px] sm:w-[90px] sm:h-[44px] '>
                        <img className='ml-2' src={Plus} alt="" />
                        <h3 className='text-[12px]'>New</h3>
                    </div>



                </div>

            </div>

            <div className="w-full max-w-4xl  gap-4  grid">

                {filtereddata.length > 0 ? (
                    filtereddata.map((invoice) => (
                        <div
                            key={invoice.id}
                            onClick={() => handleNavigate(invoice.id)}
                            className={`cursor-pointer hover:border-2 border-purple-600 flex justify-between items-center p-4 rounded-lg shadow-md `}
                        >
                            <div>
                                <h3 className="text-lg font-bold font-spartan mb-2">
                                    <span className="text-slate-400">#</span>{`${invoice.id}`}
                                </h3>
                                <p className={` mb-2 text-sm text-gray-500 font-spartan font-medium`}>
                                    Due
                                    {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-xl font-bold font-spartan">{`£${invoice.total.toFixed(2)}`}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium mb-6 font-spartan text-slate-400">{invoice.clientName}</p>
                                <span
                                    className={`inline-block px-3 py-2 font-spartan font-bold rounded-md text-sm ${invoice.status === "paid"
                                        ? "bg-green-100 text-green-600"
                                        : invoice.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    ● {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center text-center mt-12">
                        <img src={invois} alt="No Invoices" className="w-64 h-64 object-contain mb-6" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            There is nothing here
                        </h2>
                        <p className="text-gray-500">
                            Create an invoice by clicking the
                            <span className="font-bold text-purple-600">New</span> button and get started
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cards;
