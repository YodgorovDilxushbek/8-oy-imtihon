import React, { useState } from "react";

const Modal = ({ onClose, onSave }) => {
    const initialFormState = {
        senderStreet: "",
        senderCity: "",
        senderPostCode: "",
        senderCountry: "",
        clientName: "",
        clientEmail: "",
        clientStreet: "",
        clientCity: "",
        clientPostCode: "",
        clientCountry: "",
        invoiceDate: "",
        paymentTerms: "30",
        description: "",
        items: [{ name: "", quantity: 1, price: 0, total: 0 }]
    };

    // Form holatini boshqarish uchun state
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState("");

    // Input qiymatlarini yangilash funksiyasi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Item qiymatlarini yangilash funksiyasi
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

    // Yangi item qo'shish funksiyasi
    const addItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { name: "", quantity: 1, price: 0, total: 0 }],
        }));
    };

    // Itemni o'chirish funksiyasi
    const removeItem = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            items: prevData.items.filter((_, i) => i !== index),
        }));
    };

    // Formni tekshirish funksiyasi
    const validateForm = () => {
        if (formData.senderStreet.length <= 7) {
            alert("Jo'natuvchi manzili 7ta belgidan kam!");
            return false;
        }
        if (formData.senderCity.length < 4) {
            alert("Jo'natuvchi shahri 4ta belgidan kam!");
            return false;
        }
        if (formData.senderPostCode.length < 6) {
            alert("Jo'natuvchi pochta kodi 6ta belgidan kam!");
            return false;
        }
        if (formData.senderCountry.length <= 3) {
            alert("Jo'natuvchi davlati 3ta belgidan kam!");
            return false;
        }
        if (formData.clientName.length <= 2) {
            alert("Mijoz ismi 3ta belgidan kam!");
            return false;
        }
        if (formData.clientEmail.length < 11) {
            setErrors("Mijoz emaili 11ta belgidan kam!");
            return false;
        }
        if (formData.clientStreet.length <= 10) {
            alert("Mijoz manzili 10ta belgidan kam!");
            return false;
        }
        if (formData.clientCity.length <= 3) {
            alert("Mijoz shahri 3ta belgidan kam!");
            return false;
        }
        if (formData.clientPostCode.length < 6) {
            alert("Mijoz pochta kodi 6ta belgidan kam!");
            return false;
        }
        if (formData.clientCountry.length < 2) {
            alert("Mijoz davlati 6ta belgidan kam!");
            return false;
        }
        if (formData.description.length < 15) {
            alert("Tavsif 15ta belgidan kam!");
            return false;
        }
        if (formData.invoiceDate.length !== 10) {
            alert("Iltimos Invoice Date kiriting!");
            return false;
        }
        return true;
    };

    const saveToLocal = () => {
        if (!validateForm()) return;

        const newInvoice = {
            ...formData,
            id: Date.now().toString(),
            status: "pending",
            paymentDue: new Date(formData.invoiceDate).toISOString(),
            total: formData.items.reduce((sum, item) => sum + item.total, 0)
        };
        localStorage.setItem("invoiceData", JSON.stringify(newInvoice));
        onSave(newInvoice);
        setFormData(initialFormState);
    };

    return (
        <div
            className=" fixed inset-0 z-50 left-0 min-height: 100vh top-0 scrollbar-hide flex flex-col dark:text-white dark:bg-[#141625] bg-white w-full md:w-[768px] md:rounded-r-3xl p-6 pl-[70px] animation-left"
            style={{ opacity: 1, transform: "none" }}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 mr-[70px]"
                >
                    X
                </button>
            )}

            <h1 className="font-semibold dark:text-white text-3xl">Create Invoice</h1>
            <div className="overflow-y-scroll scrollbar-hide my-14 ">
                {errors && <p className="text-red-500 mb-4">{errors}</p>}
                <h1 className="text-[#7c5dfa] mb-4 font-medium">Bill From</h1>
                <div className="grid grid-cols-3 mx-1 space-y-4">
                    <div className="flex flex-col col-span-3">
                        <label className="text-gray-400 font-light">Street Address</label>
                        <input
                            id="senderStreet"
                            name="senderStreet"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                            value={formData.senderStreet}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mr-4 col-span-1">
                        <label className="text-gray-400 font-light">City</label>
                        <input
                            name="senderCity"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                            value={formData.senderCity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mr-4 col-span-1">
                        <label className="text-gray-400 font-light">Post Code</label>
                        <input
                            name="senderPostCode"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                            value={formData.senderPostCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-span-1">
                        <label className="text-gray-400 font-light">Country</label>
                        <input
                            name="senderCountry"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                            value={formData.senderCountry}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <h1 className="text-[#7c5dfa] my-4 mt-10 font-medium">Bill To</h1>
                <div className="grid grid-cols-3 mx-1 space-y-4">
                    <div className="flex flex-col col-span-3">
                        <label className="text-gray-400 font-light">Client Name</label>
                        <input
                            name="clientName"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                            value={formData.clientName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-span-3">
                        <label className="text-gray-400 font-light">Client Email</label>
                        <input
                            name="clientEmail"
                            type="email"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                            value={formData.clientEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-span-3">
                        <label className="text-gray-400 font-light">Street Address</label>
                        <input
                            name="clientStreet"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                            value={formData.clientStreet}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mr-4 col-span-1">
                        <label className="text-gray-400 font-light">City</label>
                        <input
                            name="clientCity"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                            value={formData.clientCity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mr-4 col-span-1">
                        <label className="text-gray-400 font-light">Post Code</label>
                        <input
                            name="clientPostCode"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                            value={formData.clientPostCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-span-1">
                        <label className="text-gray-400 font-light">Country</label>
                        <input
                            name="clientCountry"
                            type="text"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                            value={formData.clientCountry}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="grid mx-1 grid-cols-2 mt-8">
                    <div className="flex flex-col">
                        <label className="text-gray-400 font-light">Invoice Date</label>
                        <input
                            name="invoiceDate"
                            type="date"
                            className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800 dark:text-white mr-4"
                            value={formData.invoiceDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mx-auto w-full">
                        <label className="text-gray-400 font-light">Payment Terms</label>
                        <select
                            name="paymentTerms"
                            className="appearance-none w-full py-2 px-4 border-[.2px] rounded-lg focus:outline-none dark:bg-[#1e2139] dark:text-white dark:border-gray-800 focus:outline-purple-400 border-gray-300 select-status"
                            value={formData.paymentTerms}
                            onChange={handleChange}
                        >
                            <option value="1">Next 1 day</option>
                            <option value="7">Next 7 days</option>
                            <option value="14">Next 14 days</option>
                            <option value="30">Next 30 days</option>
                        </select>
                    </div>
                </div>

                <div className="mx-1 mt-4 flex flex-col">
                    <label className="text-gray-400 font-light">Description</label>
                    <input
                        name="description"
                        type="text"
                        className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <h2 className="text-2xl text-gray-500 mt-10">Item List</h2>
                {formData.items.map((item, index) => (
                    <div key={index} className="border-b pb-2 border-gray-300 mb-4">
                        <div className="flex dark:text-white justify-between items-center">
                            <div className="flex flex-wrap">
                                <div className="flex px-2 py-2 flex-col items-start">
                                    <h1>Item Name</h1>
                                    <input
                                        name="name"
                                        type="text"
                                        className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                                        value={item.name}
                                        onChange={(e) => handleItemChange(index, e)}
                                    />
                                </div>
                                <div className="flex px-2 py-2 flex-col items-start">
                                    <h1>Qty.</h1>
                                    <input
                                        name="quantity"
                                        type="number"
                                        min="0"
                                        className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 max-w-[60px] border-gray-300 focus:outline-none dark:border-gray-800"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, e)}
                                    />
                                </div>
                                <div className="flex px-2 py-2 flex-col items-start">
                                    <h1>Price</h1>
                                    <input
                                        name="price"
                                        type="number"
                                        min="0"
                                        className="dark:bg-[#1e2139] py-2 max-w-[100px] px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, e)}
                                    />
                                </div>
                                <div className="flex px-2 py-2 flex-col items-start">
                                    <h1>Total</h1>
                                    <div className="max-w-[100px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                                        {item.total}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => removeItem(index)}>
                                X
                            </button>
                        </div>
                    </div>
                ))}
                <button onClick={addItem} className="bg-gray-200 hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl w-full mt-6">
                    + Add New Item
                </button>
            </div>
            <div className="flex justify-between  ">
                <div >
                    <button onClick={onClose} className="  bg-gray-200 hover:opacity-80 mx-auto py-4 items-center dark:text-white dark:bg-[#252945] justify-center px-8 rounded-full animation-left">
                        Discard
                    </button>
                </div>
                <div >
                    <button onClick={saveToLocal} className="text-white hover:opacity-80 mx-auto py-4 items-center bg-[#7c5dfa] justify-center px-8 rounded-full">
                        Save &amp; Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;