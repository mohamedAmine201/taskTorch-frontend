import React, {useState} from 'react'
import {motion} from 'framer-motion'
import {Link, useNavigate} from 'react-router-dom'
import {CircleLoader} from 'react-spinners'
import Card from '../Card'
import {FaUser, FaLock} from 'react-icons/fa'

const MotionCard = motion(Card);

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`https://tasktorch-todoapp.onrender.com/api/register/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password1: password,
                password2: confirmPassword
            })
        });
        const data = await response.json();
        if (response.ok) {
            navigate('/login', {state: {message: 'A user Was Successfully Created!'}});
        } else {
            console.error(data);
        }
        setLoading(false);
    }

    return (
    <div className='container h-screen mx-auto flex justify-center items-center' >
        <MotionCard className='w-full max-w-[600px] h-[550px] flex justify-center items-center z-10'
        initial={{y: '-100vh', opacity: 0}}
        animate={{y: '0', opacity: 1}}
        transition={{type: 'spring', stiffness: 60, delay: 0.3}}
        >
            <form
            onSubmit={handleSubmit}
            className='bg-white text-black p-6 w-full h-full flex flex-col justify-center
            rounded-lg relative
            '
            method="POST"
            >
            <h1 className='w-[60%] md:w-fit h-[60px] md:h-[80px] absolute top-0 left-1/2 transform -translate-x-1/2 text-xl md:text-3xl font-bold mb-2
            text-white border p-6 rounded-xl bg-gradient-to-r from-stone-600 via-stone-500 to-stone-800 flex justify-center items-center
            '>
                Register Form</h1>
            <div className='mb-4'>
            <div className='flex items-center mb-2' >
                <FaUser className='mr-2'/>
                <label htmlFor="username">username</label>
            </div>
            <input type="text" id='username'
            className='w-full p-2 rounded-full border'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            </div>
            <div>
            <div className='flex items-center mb-2'>
                <FaLock className='mr-2'/>
                <label htmlFor="password">password</label>
            </div>
            <input type="password" id='password'
            className='w-full p-2 rounded-full border'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            </div>
            <div>
            <div className='flex items-center mb-2'>
                <FaLock className='mr-2'/>
                <label htmlFor="confirm-password">confirm password</label>
            </div>
            <input type="password" id='confirm-password'
            className='w-full p-2 rounded-full border'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            </div>
            <button 
            type="submit" 
            disabled={loading}
            className='mt-6 p-4 border rounded-full bg-gradient-to-r from-stone-600 via-stone-500 to-stone-700
            font-bold text-white cursor-pointer hover:scale-103 flex justify-center items-center'>
                {loading ? 
                <CircleLoader color="#ffffff" size={24} /> :
                "Register"
                }
            </button>
            <div className='flex items-center justify-center mt-2'>
                <span>Already have an account? </span>
                <Link className='ml-1 hover:text-stone-700 hover:underline'>
                 Login
                </Link>
            </div>
            </form>
        </MotionCard>
        <Card className='absolute w-full max-w-[700px] h-[500px] flex justify-center items-center blur-2xl'>

        </Card>
    </div>
  )
}

export default RegisterPage