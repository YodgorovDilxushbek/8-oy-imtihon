import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/data/data.json";

const EditInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    const [formData, setFormData] = useState(invoice);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...formData.items];
        newItems[index] = {
            ...newItems[index],
            [name]: value,
            total: name === "quantity" || name === "price" ? newItems[index].quantity * newItems[index].price : newItems[index].total
        };
        setFormData((prevData) => ({
            ...prevData,
            items: newItems,
        }));
    };

    const addItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { name: "", quantity: 1, price: 0, total: 0 }],
        }));
    };

    const removeItem = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            items: prevData.items.filter((_, i) => i !== index),
        }));
    };

    const handleSave = () => {
        const updatedInvoices = invoices.map((item) =>
            item.id === id ? formData : item
        );
        setInvoices(updatedInvoices);
        navigate(`/invoice/${id}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 animation-left">
            <h1 className="font-semibold text-3xl mb-4 dark:text-white">Edit Invoice #{id}</h1>
            <div className="overflow-y-auto overflow-x-hidden">
                <h1 className="text-[#7c5dfa] mb-4 font-medium">Bill From</h1>
                <div className="grid grid-cols-3 gap-4">
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="senderStreet" value={formData.senderStreet} onChange={handleChange} placeholder="Street Address" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="senderCity" value={formData.senderCity} onChange={handleChange} placeholder="City" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="senderPostCode" value={formData.senderPostCode} onChange={handleChange} placeholder="Post Code" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="senderCountry" value={formData.senderCountry} onChange={handleChange} placeholder="Country" />
                </div>
                <h1 className="text-[#7c5dfa] my-4 mt-10 font-medium">Bill To</h1>
                <div className="grid grid-cols-3 gap-4">
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="clientEmail" value={formData.clientEmail} onChange={handleChange} placeholder="Client Email" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="clientStreet" value={formData.clientStreet} onChange={handleChange} placeholder="Street Address" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="clientCity" value={formData.clientCity} onChange={handleChange} placeholder="City" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="clientPostCode" value={formData.clientPostCode} onChange={handleChange} placeholder="Post Code" />
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="clientCountry" value={formData.clientCountry} onChange={handleChange} placeholder="Country" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} />
                    <select className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange}>
                        <option value="1">Next 1 day</option>
                        <option value="7">Next 7 days</option>
                        <option value="14">Next 14 days</option>
                        <option value="30">Next 30 days</option>
                    </select>
                </div>
                <input className="border p-2 rounded w-full mt-4 dark:bg-[#1e2139] dark:text-white" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <h2 className="text-2xl text-gray-500 mt-10 dark:text-gray-400">Item List</h2>
                {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-4 mt-2 items-center">
                        <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="name" value={item.name} onChange={(e) => handleItemChange(index, e)} placeholder="Item Name" />
                        <input className="border p-2 rounded w-[46px] dark:bg-[#1e2139] dark:text-white" name="quantity" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, e)} placeholder="Qty" />
                        <input className="border p-2 rounded dark:bg-[#1e2139] dark:text-white" name="price" type="number" value={item.price} onChange={(e) => handleItemChange(index, e)} placeholder="Price" />
                        <div className="px-4 py-2 text-gray-600 dark:text-gray-400">{item.total}</div>
                        <button onClick={() => removeItem(index)} className="text-red-500">❌</button>
                    </div>
                ))}
                <button onClick={addItem} className="bg-gray-300 text-black px-4 py-2 rounded mt-6 dark:bg-[#252945] dark:text-white">+ Add New Item</button>
            </div>
            <div className="flex justify-between mt-6">
                <button onClick={() => navigate(`/invoice/${id}`)} className="bg-gray-300 text-black px-4 py-2 rounded dark:bg-[#252945] dark:text-white">Cancel</button>
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
        </div>
    );
};

export default EditInvoice;