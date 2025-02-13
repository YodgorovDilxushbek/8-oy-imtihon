import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import invois from "../assets/invois.png";
import data from "../assets/data/data.json";
import Plus from "../assets/plus.svg";
import Modal from "./Modal.jsx";

const Cards = () => {
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState("Filter by status");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Local storage'dan invoice'larni olish. Agar mavjud bo'lmasa, data.json'dan o'qib, localStorage'ga yozamiz.
    const [invoices, setInvoices] = useState(() => {
        const stored = localStorage.getItem("invoices");
        if (stored) return JSON.parse(stored);
        localStorage.setItem("invoices", JSON.stringify(data));
        return data;
    });

    // invoices o'zgarganda localStorage ni yangilaymiz
    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }, [invoices]);

    // Agar "Filter by status" tanlansa, barcha invoice'lar aks etadi, aks holda tanlangan statusga mos invoice'lar filtrlanadi
    const filteredData =
        filterStatus === "Filter by status"
            ? invoices
            : invoices.filter(
                (invoice) => invoice.status === filterStatus.toLowerCase()
            );

    const handleNavigate = (invoiceId) => {
        navigate(`/invoice/${invoiceId}`);
    };

    // Invoice'ni o'chirish
    const handleDelete = (invoiceId, e) => {
        e.stopPropagation(); // Navigatsiya oldini olish
        const updatedInvoices = invoices.filter(
            (invoice) => invoice.id !== invoiceId
        );
        setInvoices(updatedInvoices);
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    };

    // Agar invoice statusi "pending" bo'lsa, uni "paid" ga o'zgartirish
    const handleMarkAsPaid = (invoiceId, e) => {
        e.stopPropagation();
        const updatedInvoices = invoices.map((invoice) =>
            invoice.id === invoiceId && invoice.status === "pending"
                ? { ...invoice, status: "paid" }
                : invoice
        );
        setInvoices(updatedInvoices);
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    };

    // Modal'dan yangi invoice qo'shish
    const handleSave = (newInvoice) => {
        setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen pb-[350px] flex xl:ml-[150px] flex-col items-center justify-start px-6  md:pl-24 sm:pl-8 xl:mt-[75px]">
            {/* Header va filtr */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <div>
                    <h1 className="sm:text-3xl font-spartan font-bold">Invoices</h1>
                    <p className="font-spartan font-medium text-slate-400">
                        {filteredData.length} invoices
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <select
                        id="status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="font-spartan font-bold block flex justify-between sm:ml-[48px] md:gap-[40px] sm:mr-[48px] ml-3 dark:bg-black dark:text-white"
                    >
                        <option
                            value="Filter by status"
                            className="font-spartan font-bold sm:text-base text-sm"
                        >
                            Filter by status
                        </option>
                        <option
                            value="Draft"
                            className="font-spartan font-bold sm:text-base text-sm"
                        >
                            Draft
                        </option>
                        <option
                            value="Pending"
                            className="font-spartan font-bold sm:text-base text-sm"
                        >
                            Pending
                        </option>
                        <option
                            value="Paid"
                            className="font-spartan font-bold sm:text-base text-sm"
                        >
                            Paid
                        </option>
                        <option
                            value="Error"
                            className="font-spartan font-bold sm:text-base text-sm text-red-600"
                        >
                            Error
                        </option>
                    </select>

                    {/* New Invoice tugmasi: tugma bosilganda modal ochiladi */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center xl:gap-16 sm:w-[81px] w-[90px] bg-[#7C5DFA] ml-2 h-[48px] rounded-xl rounded-[24px] p-[8] mr-0 xl:w-[150px] gap-[8px] sm:w-[90px] sm:h-[44px]"
                    >
                        <img className="ml-2" src={Plus} alt="New Invoice" />
                        <h3 className="text-[12px]">New</h3>
                    </button>
                </div>
            </div>

            {/* Invoice kartalari */}
            <div className="w-full max-w-4xl gap-4 grid animation-left">
                {filterStatus === "Error" || filteredData.length === 0 ? (
                    <div className="flex flex-col items-center text-center mt-12">
                        <img
                            src={invois}
                            alt="No Invoices"
                            className="w-64 h-64 object-contain mb-6"
                        />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            There is nothing here
                        </h2>
                        <p className="text-gray-500">
                            Create an invoice by clicking the{" "}
                            <span className="font-bold text-purple-600">New</span> button and get
                            started
                        </p>
                    </div>
                ) : (
                    filteredData.map((invoice) => (
                        <div
                            key={invoice.id}
                            onClick={() => handleNavigate(invoice.id)}
                            className="cursor-pointer hover:border-2 border-purple-600 flex justify-between items-center p-4 rounded-lg shadow-md"
                        >
                            <div className="xl:flex xl:gap-[45px]">
                                <h3 className="text-lg font-bold font-spartan mb-2">
                                    <span className="text-slate-400">#</span>
                                    {invoice.id}
                                </h3>
                                <p className="mb-2 text-sm text-gray-500 font-spartan font-medium">
                                    Due{" "}
                                    {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-xl font-bold font-spartan">
                                    {`£${invoice.total.toFixed(2)}`}
                                </p>
                            </div>
                            <div className="xl:flex xl:gap-7">
                                <p className="font-medium mb-6 font-spartan text-slate-400">
                                    {invoice.clientName}
                                </p>
                                <span
                                    className={`inline-block pt-[13px] pb-[13px] pl-[18px] pr-[18px] font-spartan font-bold rounded-md text-sm ${invoice.status === "paid"
                                        ? "bg-green-100 text-green-600"
                                        : invoice.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    ●{" "}
                                    {invoice.status.charAt(0).toUpperCase() +
                                        invoice.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
        </div>
    );
};

export default Cards;