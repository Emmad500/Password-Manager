import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='bg-[#18181B] text-white fixed top-0 left-0 right-0 w-full z-50 shadow-lg border-b border-[#27272A]'>
            <div className="w-full px-6 md:px-12">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-1 hover:opacity-90 transition-opacity">
                        <div className="text-2xl font-bold tracking-tight">
                            <span className='text-violet-500'>&lt;</span>
                            Pass<span className='text-violet-500'>EM/&gt;</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className='text-zinc-300 hover:text-white font-medium transition-colors text-sm'>
                            Dashboard
                        </Link>
                        <Link to="/about" className='text-zinc-300 hover:text-white font-medium transition-colors text-sm'>
                            About
                        </Link>
                        <Link to="/contact" className='text-zinc-300 hover:text-white font-medium transition-colors text-sm'>
                            Support
                        </Link>

                        {/* GitHub Button */}
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-violet-500/20 ml-2 text-sm'
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-zinc-300 hover:text-white focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#18181B] border-b border-[#27272A]">
                    <div className="px-6 pt-2 pb-4 space-y-2 flex flex-col">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className='text-zinc-300 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-md font-medium transition-colors text-sm'
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                            className='text-zinc-300 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-md font-medium transition-colors text-sm'
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className='text-zinc-300 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-md font-medium transition-colors text-sm'
                        >
                            Support
                        </Link>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='bg-violet-600 hover:bg-violet-500 text-white px-3 py-2 rounded-md font-medium transition-all flex items-center gap-2 shadow-md w-fit mt-2 text-sm'
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
