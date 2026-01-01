import React from 'react'

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className='text-4xl font-bold text-zinc-900 mb-6 flex items-center gap-3'>
                    <span className='text-violet-600'>&lt;</span>
                    Contact Support
                    <span className='text-violet-600'>/&gt;</span>
                </h1>

                <p className='text-zinc-600 text-lg mb-8'>
                    Have questions or need assistance? Our dedicated support team is here to help you 24/7.
                </p>

                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-8">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className='text-sm font-semibold text-violet-600 uppercase tracking-wider'>Email Us</h3>
                            <a href="mailto:support@passem.com" className='text-xl text-zinc-900 hover:text-violet-600 transition-colors block'>
                                support@passem.com
                            </a>
                        </div>

                        <div className="space-y-2">
                            <h3 className='text-sm font-semibold text-violet-600 uppercase tracking-wider'>Call Us</h3>
                            <p className='text-xl text-zinc-900'>
                                +1 (555) 123-4567
                            </p>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <h3 className='text-sm font-semibold text-violet-600 uppercase tracking-wider'>Visit Us</h3>
                            <p className='text-xl text-zinc-900'>
                                123 Security Blvd, Tech City, TC 90210
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
