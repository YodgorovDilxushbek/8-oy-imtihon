import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import data from "../assets/data/data.json";

const CardDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    // Local storage'dan invoice'larni olish (agar mavjud bo'lmasa, data.json dan o'qiladi)
    const [invoices, setInvoices] = useState(() => {
        const stored = localStorage.getItem("invoices");
        if (stored) return JSON.parse(stored);
        localStorage.setItem("invoices", JSON.stringify(data));
        return data;
    });

    // invoices o'zgarganda localStorage ni yangilash
    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }, [invoices]);

    // Tanlangan id bo'yicha invoice topiladi
    const invoice = invoices.find((item) => item.id === id);

    if (!invoice) {
        return <div className="text-center text-red-500">Ma'lumot topilmadi</div>;
    }

    // Invoice ni ro'yxatdan olib tashlash va localStorage ni yangilash
    const handleDelete = () => {
        const updatedInvoices = invoices.filter((item) => item.id !== id);
        setInvoices(updatedInvoices);
        setModalOpen(false);
        navigate("/");
    };


    const handlePaid = () => {
        if (invoice.status === "pending") {
            const updatedInvoices = invoices.map((item) =>
                item.id === id ? { ...item, status: "paid" } : item
            );
            setInvoices(updatedInvoices);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-invoice/${id}`);
    };

    return (
        <div className="p-6 flex justify-center">
            <div className="max-w-3xl w-full">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center space-x-4 group dark:text-white font-thin mb-8"
                >
                    <FaArrowLeft />
                    <p className="group-hover:opacity-80">Go back</p>
                </button>

                <div className="bg-white dark:bg-[#1e2139] rounded-lg shadow-lg p-6 mb-6 flex justify-between items-center">
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
                    <div className=" md:flex space-x-3">



                        <button
                            className="bg-[#F9FAFE] text-[#7E88C3] px-[28px] py-[18px] hover:bg-[#DFE3FA] rounded-[24px] text-sm font-medium"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>


                        <button
                            className="text-white bg-[#EC5757] hover:bg-[#FF9797] hover:opacity-80 px-7 py-3 rounded-full"
                            onClick={() => setModalOpen(true)}
                        >
                            Delete
                        </button>
                        {invoice.status === "pending" && (
                            <button
                                className="bg-[#7C5DFA] hover:bg-[#9277FF] text-white px-7 py-3 rounded-full"
                                onClick={handlePaid}
                            >
                                Mark as Paid
                            </button>
                        )}
                    </div>
                </div>

                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-[#1e2139] rounded-lg shadow-lg p-6 max-w-sm">
                            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                            <p className="text-gray-500 mb-6">
                                Are you sure you want to delete this invoice? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="bg-gray-300 dark:bg-gray-700 rounded-lg px-4 py-2 text-sm"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500 text-white rounded-lg px-4 py-2 text-sm"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-[#1e2139] rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                        <div>
                            <h1 className="font-semibold text-xl dark:text-white">
                                <span className="text-[#7e88c3]">#</span>{invoice.id}
                            </h1>
                            <p className="text-sm text-gray-500">{invoice.clientName}</p>
                        </div>
                        <div className="text-left text-gray-400 text-sm md:text-right flex flex-col items-start md:items-end mt-4 md:mt-0">
                            <p>{invoice.senderAddress.street}</p>
                            <p>{invoice.senderAddress.city}</p>
                            <p>{invoice.senderAddress.postCode}</p>
                            <p>{invoice.senderAddress.country}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <h3 className="text-gray-400 font-thin">Invoice Date</h3>
                                <h1 className="text-lg font-semibold dark:text-white">{invoice.createdAt}</h1>
                            </div>
                            <div>
                                <h3 className="text-gray-400 font-thin">Payment Due</h3>
                                <h1 className="text-lg font-semibold dark:text-white">{invoice.paymentDue}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <p className="text-gray-400 font-thin">Bill to</p>
                            <h1 className="text-lg font-semibold dark:text-white">{invoice.clientName}</h1>
                            <p className="text-gray-400 font-thin">{invoice.clientAddress.street}</p>
                            <p className="text-gray-400 font-thin">{invoice.clientAddress.city}</p>
                            <p className="text-gray-400 font-thin">{invoice.clientAddress.postCode}</p>
                            <p className="text-gray-400 font-thin">{invoice.clientAddress.country}</p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <p className="text-gray-400 font-thin">Sent to</p>
                            <h1 className="text-lg font-semibold dark:text-white">{invoice.clientEmail}</h1>
                        </div>
                    </div>

                    <div className="bg-[#f9fafe] dark:bg-[#252945] rounded-lg p-10 mb-6">
                        <div className="hidden sm:flex justify-around">
                            <div className="space-y-4">
                                <p className="text-gray-400 font-thin">Item name</p>
                                <h1 className="text-base font-semibold dark:text-white">Brand Guidelines</h1>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-400 font-thin">Qty.</p>
                                <h1 className="text-base font-semibold dark:text-white">1</h1>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-400 font-thin">Item price</p>
                                <h1 className="text-base font-semibold dark:text-white">£1800.9</h1>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-400 font-thin">Total</p>
                                <h1 className="text-base font-semibold dark:text-white">£1800.9</h1>
                            </div>
                        </div>
                        <div className="sm:hidden flex justify-between text-lg dark:text-white">
                            <h1>Brand Guidelines</h1>
                            <h1>£1800.9</h1>
                        </div>
                    </div>

                    <div className="p-10 font-semibold text-white rounded-lg flex justify-between dark:bg-black bg-gray-700">
                        <h3 className="text-xl">Amount Due</h3>
                        <h1 className="text-3xl">£1800.9</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;