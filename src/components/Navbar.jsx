const Navbar = () => {
    return (
        <nav className='bg-slate-800 '>
            <div className="lg:mycontainer flex items-center justify-between md:px-40 px-2 py-5 h-14 text-white">
                <div className="flex font-bold text-2xl">
                    <img className="w-7" src="/assets/password.svg" alt="" />
                    <span className='text-green-600'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-600'>OP/&gt;</span>
                </div>

                <button className='flex ring-2 ring-green-300 items-center gap-1 bg-green-700 py-1.5 px-3 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                    <img className='invert' src="/assets/github.svg" alt="" />
                    <span>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
