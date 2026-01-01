import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-[#18181B] text-zinc-300 mt-auto border-t border-[#27272A] w-full'>
            <div className="w-full px-6 md:px-12 py-5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="font-bold text-lg text-white">
                            <span className='text-violet-500'>&lt;</span>
                            <span>Pass</span><span className='text-violet-500'>EM/&gt;</span>
                        </div>
                        <span className="text-zinc-600">|</span>
                        <span className="text-sm">Secure Vault</span>
                    </div>

                    <div className='text-sm font-medium'>
                        Empowering Digital Security
                    </div>

                    <div className='text-sm text-zinc-400'>
                        © 2026 All Rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
