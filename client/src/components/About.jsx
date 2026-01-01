import React from 'react'

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className='text-4xl font-bold text-zinc-900 mb-6 flex items-center gap-3'>
                    <span className='text-violet-600'>&lt;</span>
                    About PassEM
                    <span className='text-violet-600'>/&gt;</span>
                </h1>

                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-8 space-y-6 text-zinc-600 leading-relaxed">
                    <p className='text-lg'>
                        <strong className="text-zinc-900">PassEM</strong> is a secure, corporate-grade password manager designed to keep your digital life organized and safe.
                    </p>
                    <p>
                        In an era where digital security is paramount, PassEM provides a robust solution for storing your most sensitive credentials. Built with modern encryption standards and a user-first philosophy, we ensure that your data remains accessible only to you.
                    </p>
                    <p>
                        Our mission is to simplify password management for professionals and businesses alike, providing a seamless and intuitive user experience without compromising on security.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
