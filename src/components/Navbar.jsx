import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.jpg'
import {FaBars, FaTimes, FaUserPlus, FaList, FaLockOpen, FaDoorOpen} from 'react-icons/fa'


const Navbar = ({isAuthenticated, setIsAuthenticated}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        setMessage("You've been logged out Successfully!")
    }
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('')
            }, 2000)
            return () => clearTimeout(timer);
        }
    }, [message]);

    const mobileNavLinks = (
    <>
        <Link to={isAuthenticated ? "/tasks" : '/login'} className="flex items-center p-3 hover:bg-purple-100 rounded-lg">
            <FaList className="mr-2" />
            My Tasks
        </Link>
        {isAuthenticated
        ? <div className='flex items-center p-3'> 
        <FaDoorOpen className='mr-2' />
        <button className='flex items-center p-3 hover:bg-purple-100 rounded-lg'
        onClick={handleLogout}
        >
            Logout
        </button>
        </div>
        : <> 
        <Link to="/login" className="flex items-center p-3 hover:bg-purple-100 rounded-lg">
            <FaLockOpen className="mr-2" />
                Login
            </Link>
        <Link to="/register" className="flex items-center p-3 hover:bg-purple-100 rounded-lg">
            <FaUserPlus className="mr-2" />
            Register
        </Link>
        </>}
        </>
    );
    return (
    <div className="border border-purple-500">
        <div className="container mx-auto flex justify-between items-center">
            {message && (
            <div className="absolute left-10 top-18 md:right-0 md:top-4 z-100 bg-purple-100 text-purple-700 p-2 rounded mb-4">
                {message}
            </div>
            )}
            <Link className="flex items-center" to="/">
                <img src={logo} className='w-[60px] mr-1 inline' />
                <h2 className='text-4xl bg-gradient-to-r
                from-purple-600 to-purple-700 bg-clip-text text-transparent font-bold'>TaskTorch</h2>
            </Link>
            {!isOpen &&
            <button
            className='md:hidden text-purple-700 text-2xl'
            onClick={() => setIsOpen(true)}>
            <FaBars />
            </button>}
            <Link 
            className='hidden md:inline-flex hover:font-bold hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white 
            p-3 rounded-lg  flex items-center'
            to="tasks/"
            >
                <FaList className='mr-2'/>
                My Tasks
            </Link>
            <ul className='flex justify-between items-center'>
            {isAuthenticated
            ? <div className='hidden md:inline-flex hover:font-bold hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white 
            p-3 rounded-lg flex items-center cursor-pointer'>
            <FaDoorOpen className='mr-2' />
            <button onClick={handleLogout} className='cursor-pointer'
            >
                Logout
            </button>
            </div>
            : <>
            <Link className='hidden md:inline-flex hover:font-bold hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white 
            p-3 rounded-lg flex items-center mr-4'
            to="login/"
            >
                <FaLockOpen className=' mr-2' />
                <li>Login</li> 
                </Link>
                <Link className='hidden md:inline-flex hover:font-bold hover:bg-gradient-to-r from-purple-600 to-purple-700 hover:text-white 
            p-3 rounded-lg  flex items-center'
            to='register/'
            >
                    <FaUserPlus className=' mr-2' />
                    <li className=''>Register</li>
                </Link>
            </>}
            </ul>
            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="fixed top-0 right-0 w-62 h-full bg-white shadow-lg z-50 p-6 py-15 flex flex-col space-y-4">
                {mobileNavLinks}
                <button
                className="absolute top-8 right-8 self-end text-purple-700 text-2xl mb-4"
                onClick={() => setIsOpen(false)}
                >
                <FaTimes />
                </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar