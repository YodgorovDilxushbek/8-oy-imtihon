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

    // Agar invoice statusi "pending" bo'lsa, uni "paid" ga o'zgartirish va localStorage ni yangilash
    const handleMarkAsPaid = () => {
        if (invoice.status === "pending") {
            const updatedInvoices = invoices.map((item) =>
                item.id === id ? { ...item, status: "paid" } : item
            );
            setInvoices(updatedInvoices);
        }
    };

    // Tahrirlash sahifasiga o'tish
    const handleEdit = () => {
        navigate(`/edit-invoice/${id}`);
    };

    return (
        <div className="animation-left">
            <div className="max-w-3xl mx-auto p-6">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-4 mb-8 text-sm font-bold"
                >
                    <FaArrowLeft />
                    Go back
                </button>

                <div className="bg-white dark:bg-[rgb(30,33,57)] rounded-lg shadow-lg p-6 mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-500">Status</span>
                        <div
                            className={`px-4 py-2 rounded-md flex items-center gap-2 ${invoice.status === "paid"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                                }`}
                        >
                            <span className="h-2 w-2 rounded-full bg-current"></span>
                            {invoice.status}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {invoice.status === "pending" && (
                            <button
                                className="bg-green-500 text-white px-6 py-2 rounded-[24px] text-sm font-medium"
                                onClick={handleMarkAsPaid}
                            >
                                Mark as Paid
                            </button>
                        )}
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded-[24px] text-sm font-medium"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-6 py-2 rounded-[24px] text-sm font-medium"
                            onClick={() => setModalOpen(true)}
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* DELETE Modal */}
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

                {/* Invoice Tafsilotlari */}
                <div className="bg-white dark:bg-[#1e2139] rounded-lg shadow-lg p-6">
                    <h1 className="text-xl font-bold">#{invoice.id}</h1>
                    <p className="text-gray-500">{invoice.description}</p>

                    <div className="mt-4 grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-500 mb-2">Invoice Date</p>
                            <p className="font-bold">{invoice.createdAt}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-2">Payment Due</p>
                            <p className="font-bold">{invoice.paymentDue}</p>
                        </div>
                    </div>

                    {/* Client ma'lumotlari */}
                    <div className="mt-4 grid md:grid-cols-3 gap-8">
                        <div>
                            <p className="text-gray-500 mb-2">Bill To</p>
                            <p className="font-bold">{invoice.clientName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-2">Sent to</p>
                            <p className="font-bold">{invoice.clientEmail}</p>
                        </div>
                    </div>

                    {/* Items table */}
                    <div className="bg-gray-100 dark:bg-[#252945] rounded-lg p-6 mt-6">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 text-left">
                                    <th className="py-2">Item Name</th>
                                    <th className="text-center">QTY.</th>
                                    <th className="text-right">Price</th>
                                    <th className="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2">{item.name}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-right">£{Number(item.price).toFixed(2)}</td>
                                        <td className="text-right font-bold">
                                            £{(item.quantity * Number(item.price)).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Amount Due */}
                    <div className="bg-[#373b53] text-white rounded-lg p-6 flex justify-between items-center mt-6">
                        <span>Amount Due</span>
                        <span className="text-2xl font-bold">£{invoice.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;