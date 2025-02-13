import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import invois from "../assets/invois.png";
import data from "../assets/data/data.json";
import Plus from "../assets/plus.svg";
import Modal from "./Modal.jsx";
import { FaCaretRight } from "react-icons/fa";


const Cards = () => {
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState("Filter by status"); // Fakturalar statusini filtrlash uchun holat
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal oynasining ochiq/yopiq holatini boshqarish

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

    // statusni filtirlash
    const filteredData =
        filterStatus === "Filter by status"
            ? invoices
            : invoices.filter(
                (invoice) => invoice.status === filterStatus.toLowerCase()
            );

    // Invoice sahifasiga navigatsiya qilish
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
        ); // Faktura statusini "pending" dan "paid" ga o'zgartiradi
        setInvoices(updatedInvoices); // Yangi faktura ro'yxati holatini yangilaydi
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices)); // localStorage ni yangilaydi
    };

    // Modal'dan yangi invoice qo'shish
    const handleSave = (newInvoice) => {
        setInvoices((prevInvoices) => [...prevInvoices, newInvoice]); // Yangi fakturani ro'yxatga qo'shadi
        setIsModalOpen(false); // Modalni yopadi
    };

    return (
        <div className="min-h-screen pb-[590px] flex xl:ml-[150px] flex-col items-center justify-start px-6 md:pl-24 sm:pl-8 xl:mt-[75px]">
            {/* Header va filtr */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <div>
                    <h1 className="sm:text-3xl font-spartan font-bold">Invoices</h1>
                    <p className="font-spartan font-medium text-slate-400">
                        {filteredData.length} invoices {/* Fakturalar sonini ko'rsatadi */}
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <select
                        id="status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)} // Filtr holatini yangilaydi
                        className="font-spartan font-bold flex justify-between sm:ml-[48px] md:gap-[40px] sm:mr-[48px] ml-3 dark:bg-[#0C0E16] p-2 dark:text-white"
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
                        className="flex items-center xl:gap-[16px] font-bold sm:w-[81px] w-[120px] bg-[#7C5DFA] ml-2 h-[48px]  rounded-[24px] p-[8] mr-0 xl:w-[150px] gap-[]  sm:h-[44px]"
                    >
                        <img className="ml-2" src={Plus} alt="  " />
                        <h3 className="text-[12px]">New Invoice </h3>
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
                            <div className="xl:flex xl:gap-[45px] items-center">
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
                                <p className="font-medium mt-3 font-spartan text-slate-400 ">
                                    {invoice.clientName}
                                </p>
                                <span
                                    className={`inline-block h-[40px] px-[18px] py-[10px] items-center  mt- font-spartan font-bold rounded-md text-sm
                                        ${invoice.status === "paid"
                                            ? "bg-[#F3FDFA] text-green-600"
                                            : invoice.status === "pending"
                                                ? "bg-[#FFF9F0] text-yellow-600"
                                                : "bg-[#F4F4F5] text-gray-600"
                                        }`}
                                >
                                    ●{" "}
                                    {invoice.status.charAt(0).toUpperCase() +
                                        invoice.status.slice(1)}
                                </span>
                                <FaCaretRight className="mt-3" />

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