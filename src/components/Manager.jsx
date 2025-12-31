import React from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef("");
    console.log(passwordRef.current)
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("/assets/show.svg")) {
            ref.current.src = "/assets/hide.svg"
            passwordRef.current.type = "password";
            ref.current.title = "Show"
        }
        else {
            ref.current.src = "/assets/show.svg"
            passwordRef.current.type = "text";
            ref.current.title = "Hide"
        }
    }

    const savePassword = () => {
        if (form.site === "" || form.username === "" || form.password === "") {
            return toast.error('Input field is empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
        else {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            toast.success('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
        setForm({ site: "", username: "", password: "" })
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id);
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter((item) => item.id !== id))
    }

    const deletePassword = (id) => {
        let confirmDelete = confirm("Do you really want to delete this")
        if (confirmDelete) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
            toast.info('Password Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }


    return (

        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"

            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="lg:container lg:px-40 lg:py-16 lg:mx-auto">
                <h1 className='font-bold text-4xl text-center'><span className='text-green-600'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-600'>OP/&gt;</span></h1>
                <p className='text-green-900 text-center'>Your own password manager</p>
                <div className='flex flex-col items-center p-4 gap-5'>
                    <input value={form.site} name="site" onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border-2 border-green-700 w-full text-black px-4 py-1' type="text" />
                    <div className='flex sm:flex-row flex-col w-full gap-5'>
                        <input value={form.username} name="username" onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-green-700 w-full text-black px-4 py-1' type="text" />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} name="password" onChange={handleChange} placeholder='Enter Password' className='rounded-full border-2 border-green-700 w-full text-black px-4 py-1' type="password" />
                            <span className={`absolute right-4 top-[6px] cursor-pointer ${passwordRef.current.value === "" ? "hidden" : "inline"}`} onClick={showPassword}>
                                <img title="Show" ref={ref} src="/assets/show.svg" alt="show" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full px-5 py-2 hover:scale-105 transition-transform gap-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>


                {/* Your Passwords */}
                <div className="lg:px-0 px-3">
                    <h2 className="text-2xl font-bold py-3">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>
                                        <td className=" text-center w-32 py-2 border-b-2 border-white"><a href={item.site} target='_blank'>{item.site}</a>
                                            <span onClick={() => copyText(item.site)} title="Copy">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    className="w-5 align-middle mx-3 cursor-pointer">
                                                </lord-icon>
                                            </span>
                                        </td>
                                        <td className="text-center w-32 py-2 border-b-2 border-white">{item.username}
                                            <span onClick={() => copyText(item.username)} title="Copy">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    className="w-5 align-middle mx-3 cursor-pointer">
                                                </lord-icon>
                                            </span>
                                        </td>
                                        <td className="text-center w-32 py-2 border-b-2 border-white">{item.password}
                                            <span onClick={() => copyText(item.password)} title="Copy">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    className="w-5 align-middle mx-3 cursor-pointer">
                                                </lord-icon>
                                            </span>
                                        </td>
                                        <td className="text-center w-32 py-2 border-b-2 border-white">
                                            <span title="Edit" onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/umuwriak.json"
                                                    trigger="hover"
                                                    className="w-5 align-middle mx-3 cursor-pointer">
                                                </lord-icon>
                                            </span>
                                            <span title="Delete" onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                    className="w-5 align-middle mx-1.5 cursor-pointer">
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager
