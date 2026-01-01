import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import About from './components/About'
import Contact from './components/Contact'
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col min-h-screen bg-neutral-50 pt-16">
          <Navbar />
          <main className="flex-grow">
            <Manager />
          </main>
          <Footer />
        </div>
      )
    },
    {
      path: "/about",
      element: (
        <div className="flex flex-col min-h-screen bg-neutral-50 pt-16">
          <Navbar />
          <main className="flex-grow">
            <About />
          </main>
          <Footer />
        </div>
      )
    },
    {
      path: "/contact",
      element: (
        <div className="flex flex-col min-h-screen bg-neutral-50 pt-16">
          <Navbar />
          <main className="flex-grow">
            <Contact />
          </main>
          <Footer />
        </div>
      )
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
