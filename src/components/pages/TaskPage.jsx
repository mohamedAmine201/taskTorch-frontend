import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {FaCheck, FaTrashAlt} from 'react-icons/fa'

const TaskPage = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [todo, setTodo] = useState(null);
    const token = localStorage.getItem("token") || '';
    const navigate = useNavigate();

    const fetchTodo = async () => {
        const response = await fetch(`${import.meta.VITE_API_BASE_URL}/api/todos/${id}/`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        const data = await response.json();
        setTodo(data);
        return data;
    }
    useEffect(() => {
    fetchTodo();
    }, [])


    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.VITE_API_BASE_URL}/api/todos/${id}/`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({title})
    });
    const data = await response.json();
    console.log(data)
    setTitle('');
    navigate('/tasks');
    return data;
    }

    const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you wanna delete this?");
    if (!confirm) return;
    else {
        const response = await fetch(`${import.meta.VITE_API_BASE_URL}/api/todos/${id}/`, {
            method: "DELETE",
            headers: {
            'Authorization': `Token ${token}`
            }
        });
        if (response.ok) {
            navigate('/tasks')
        } else {
            console.error("Failed to delete task:", response.status);
        }
        }
    }

    const handleCheck = async (todo) => {
    const response = await fetch(`${import.meta.VITE_API_BASE_URL}/api/todos/${id}/`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
        },
        body: JSON.stringify({completed:!todo.completed})
    })
    if (response.ok) { 
        navigate('/tasks');
    } else {
        console.error('Failed to update taske', response.status);
    }
}

  return (
    <div className='container mx-auto p-4'>
        <h1 className='text-center text-3xl md:text-5xl'>
        Manage 
        <span className='font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mx-2'>Your</span> 
        Tasks <br /> Using 
        <span className='font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mx-2'>TaskTorch</span>
        </h1>
        <div>
        <form onSubmit={handleSubmit} action="POST">
            <div className='border border-purple-600 rounded-full md:w-[50%] mx-auto px-4 py-2 relative mt-8'>
            <input 
            className='w-full focus:outline-none'
            type="text"
            placeholder="Update your task" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input 
            className='absolute inset-y-0 h-full right-0 px-4 py-2 border-none rounded-full cursor-pointer
            bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 font-bold text-white hover:brightness-110'
            type="submit" 
            value='UPDATE' />
            </div>
        </form>
        <div className='md:w-[50%] mx-auto p-4'>
            {todo &&  (
            <div className='p-2 border-none rounded-lg my-2 font-bold flex justify-between items-center
            bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white'>
                <div className='flex justify-center items-center'>
                {todo.completed ?
                <>
                <button onClick={() => handleCheck(todo)}>
                    <FaCheck className='cursor-pointer mr-4 border rounded-full p-2 w-8 h-8'/>
                    </button>
                <span className='line-through text-sm md:text-md'>{todo.title}</span>
                </>:
                <>
                <button onClick={() => handleCheck(todo)}>
                    <div className='cursor-pointer mr-4 border rounded-full p-2 w-8 h-8' ></div>
                    </button>
                <span className='text-sm md:text-md' >{todo.title}</span>
                </>
                }
                
                </div>
                <button onClick={() => handleDelete(todo.id)} className='cursor-pointer'>
                <FaTrashAlt className='md:mr-4 w-6 h-6' />
                </button>
            </div>
            )}
        </div>
        </div>
    </div>
  )
}

export default TaskPage