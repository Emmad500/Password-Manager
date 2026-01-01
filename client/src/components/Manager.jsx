import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setform] = useState({ url: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const getPasswords = async () => {
        try {
            let req = await fetch("http://localhost:3001/")
            let passwords = await req.json()
            setPasswordArray(passwords)
        } catch (error) {
            console.error("Error fetching passwords:", error);
            toast.error("Failed to fetch passwords");
        }
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const savePassword = async () => {
        if (form.url.length > 3 && form.username.length > 3 && form.password.length > 3) {
            console.log("Saving password...", form);
            try {
                let url = "http://localhost:3001/";
                let method = "POST";

                if (editingId) {
                    console.log("Updating existing password with ID:", editingId);
                    url = "http://localhost:3001/" + editingId;
                    method = "PUT";
                }

                let res = await fetch(url, {
                    method: method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form })
                })

                if (res.ok) {
                    console.log("Password saved/updated successfully");
                    getPasswords();
                    setform({ url: "", username: "", password: "" })
                    setEditingId(null);
                    toast.success(editingId ? 'Password updated!' : 'Password saved!', {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "light",
                    });
                } else {
                    console.error("Error response from server:", res.status);
                    const errorData = await res.json();
                    toast.error(`Error: ${errorData.message || 'Failed to save'}`);
                }
            } catch (error) {
                console.error("Error in savePassword:", error);
                toast.error(`Error: ${error.message}`);
            }
        }
        else {
            toast.warn('All fields must be at least 3 characters long');
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with ID:", id);
        const passwordToEdit = passwordArray.find(item => item._id === id);
        if (passwordToEdit) {
            setform({
                url: passwordToEdit.url,
                username: passwordToEdit.username,
                password: passwordToEdit.password
            });
            setEditingId(id);
            // Scroll to top to see form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            try {
                let res = await fetch("http://localhost:3001/" + id, { method: "DELETE" })
                if (res.ok) {
                    setPasswordArray(passwordArray.filter(item => item._id !== id))
                    toast.success('Password deleted!', {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "light",
                    });
                    if (editingId === id) {
                        setEditingId(null);
                        setform({ url: "", username: "", password: "" });
                    }
                } else {
                    toast.error('Error deleting password');
                }
            } catch (error) {
                toast.error('Error deleting password');
            }
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover={false}
                theme="light"
            />

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className='text-4xl font-bold text-zinc-900 mb-2'>
                        <span className='text-violet-600'>&lt;</span>
                        Pass<span className='text-violet-600'>EM/&gt;</span>
                    </h1>
                    <p className='text-zinc-600 text-lg'>Your Secure Password Vault</p>
                </div>

                {/* Password Form Card */}
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 md:p-8 mb-10 max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {/* URL Input */}
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">Website URL</label>
                            <input
                                value={form.url}
                                onChange={handleChange}
                                placeholder='https://example.com'
                                className='w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-zinc-900 placeholder-zinc-400'
                                type="text"
                                name="url"
                                id="url"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Username Input */}
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Username</label>
                                <input
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder='john@example.com'
                                    className='w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-zinc-900 placeholder-zinc-400'
                                    type="text"
                                    name="username"
                                    id="username"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder='••••••••'
                                        className='w-full px-4 py-3 rounded-lg bg-white border border-zinc-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-zinc-900 placeholder-zinc-400'
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                    />
                                    <button
                                        onClick={togglePasswordVisibility}
                                        className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1'
                                    >
                                        {passwordVisible ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={savePassword}
                            className={`w-full md:w-auto md:px-12 ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-violet-600 hover:bg-violet-700'} text-white font-semibold py-3.5 rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2 mx-auto`}
                        >
                            <lord-icon
                                src={editingId ? "https://cdn.lordicon.com/wloilxuq.json" : "https://cdn.lordicon.com/jgnvfzqg.json"}
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{ width: "24px", height: "24px" }}
                            >
                            </lord-icon>
                            {editingId ? 'Update Password' : 'Save Password'}
                        </button>
                    </div>
                </div>

                {/* Passwords List */}
                <div className="max-w-7xl mx-auto">
                    <h2 className='text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2'>
                        <span className="w-1 h-6 bg-violet-600 rounded-full"></span>
                        Saved Passwords
                    </h2>

                    {passwordArray.length === 0 ? (
                        <div className='bg-white rounded-xl border border-zinc-200 shadow-sm p-12 text-center'>
                            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <lord-icon
                                    src="https://cdn.lordicon.com/ulnswmkk.json"
                                    trigger="loop"
                                    delay="2000"
                                    colors="primary:#7c3aed"
                                    style={{ width: "32px", height: "32px" }}
                                >
                                </lord-icon>
                            </div>
                            <p className='text-zinc-600 text-lg'>No passwords saved yet</p>
                            <p className='text-zinc-500 text-sm mt-2'>Your secure vault is empty</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-zinc-50 border-b border-zinc-200">
                                        <tr>
                                            <th className='py-4 px-6 text-sm font-semibold text-zinc-700 uppercase tracking-wider w-1/2'>Website</th>
                                            <th className='py-4 px-6 text-sm font-semibold text-zinc-700 uppercase tracking-wider w-1/4'>Username</th>
                                            <th className='py-4 px-6 text-sm font-semibold text-zinc-700 uppercase tracking-wider w-1/6'>Password</th>
                                            <th className='py-4 px-6 text-sm font-semibold text-zinc-700 uppercase tracking-wider text-center'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {passwordArray.map((item, index) => (
                                            <tr key={index} className="hover:bg-zinc-50 transition-colors group">
                                                <td className='py-3 px-6 text-sm'>
                                                    <div className='flex items-center gap-3'>
                                                        <a
                                                            href={item.url}
                                                            target='_blank'
                                                            rel="noopener noreferrer"
                                                            className='text-violet-600 hover:text-violet-800 font-medium truncate max-w-[200px] md:max-w-[300px] block'
                                                        >
                                                            {item.url}
                                                        </a>
                                                        <div className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0' onClick={() => copyText(item.url)}>
                                                            <lord-icon
                                                                style={{ "width": "18px", "height": "18px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#7c3aed">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-6 text-sm'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='text-zinc-700 truncate max-w-[100px] md:max-w-[150px]'>{item.username}</span>
                                                        <div className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0' onClick={() => copyText(item.username)}>
                                                            <lord-icon
                                                                style={{ "width": "18px", "height": "18px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#7c3aed">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-6 text-sm'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='font-mono text-zinc-500'>{"•".repeat(Math.min(item.password.length, 10))}</span>
                                                        <div className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0' onClick={() => copyText(item.password)}>
                                                            <lord-icon
                                                                style={{ "width": "18px", "height": "18px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                                colors="primary:#7c3aed">
                                                            </lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-6 text-center'>
                                                    <div className='flex justify-center gap-3'>
                                                        <span className='cursor-pointer inline-flex p-1.5 rounded-full hover:bg-violet-50 transition-colors' onClick={() => editPassword(item._id)}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/wloilxuq.json"
                                                                trigger="hover"
                                                                colors="primary:#7c3aed"
                                                                style={{ "width": "22px", "height": "22px" }}>
                                                            </lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer inline-flex p-1.5 rounded-full hover:bg-red-50 transition-colors' onClick={() => deletePassword(item._id)}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="hover"
                                                                colors="primary:#ef4444"
                                                                style={{ "width": "22px", "height": "22px" }}>
                                                            </lord-icon>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager
