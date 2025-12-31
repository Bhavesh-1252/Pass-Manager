import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="bg-slate-800 text-white flex flex-col justify-center items-center py-5">
                <div className="font-bold text-2xl">
                    <span className='text-green-600'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-600'>OP/&gt;</span>
                </div>
                <div className="flex flex-col text-sm items-center mt-2">
                    <span>Copyright © 2025 | All rights reserved</span>
                    <span className="flex items-center">Designed & Developed with&nbsp;<img className="w-4" src="/icons/heart.svg" alt="" /></span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
