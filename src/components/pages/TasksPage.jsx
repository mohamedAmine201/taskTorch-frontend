import React, {useState, useEffect} from 'react'
import {FaCheck, FaTrashAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const TasksPage = () => {
  const [title, setTitle] = useState('');
  const token = localStorage.getItem("token") || '';
  const [todos, setTodos] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.VITE_API_BASE_URL}/api/todos/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({title})
    });
    const data = await response.json();
    console.log(data)
    setTitle(''); // To reset the title after submit
    fetchTodos();
    return data;
  }

  const fetchTodos = async () => {
    const response = await fetch(`${import.meta.VITE_API_BASE_URL}/api/todos/`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    });
    const data = await response.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, [])
  const handleCheck = async (id, completed) => {
    const response = await fetch(`${import.meta.VITE_API_BASE_URL}/api/todos/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({completed:!completed})
    })
    if (response.ok) { 
      fetchTodos();
    } else {
      console.error('Failed to update taske', response.status);
    }
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
        fetchTodos();
      } else {
        console.error("Failed to delete task:", response.status);
      }
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
            placeholder="write a new task" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input 
            className='absolute inset-y-0 h-full right-0 px-4 py-2 border-none rounded-full cursor-pointer
            bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 font-bold text-white hover:brightness-110'
            type="submit" 
            value='ADD' />
          </div>
        </form>
        <div className='md:w-[50%] mx-auto p-4'>
          {todos.map(todo => (
            <div className='p-2 border-none rounded-lg my-2 font-bold flex justify-between items-center
            bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white'>
              <div className='flex justify-center items-center'>
                {todo.completed ?
                <>
                <button onClick={() => handleCheck(todo.id, todo.completed)}>
                  <FaCheck className='cursor-pointer mr-4 border rounded-full p-2 w-8 h-8'/>
                  </button>
                <Link to={`/tasks/${todo.id}`}>
                <span className='line-through text-sm md:text-md'>{todo.title}</span>
                </Link>
                </>:
                <>
                <button onClick={() => handleCheck(todo.id, todo.completed)}>
                  <div className='cursor-pointer mr-4 border rounded-full p-2 w-8 h-8' ></div>
                  </button>
                <Link to={`/tasks/${todo.id}`}>
                <span className='text-sm md:text-md' >{todo.title}</span>
                </Link>
                </>
                }
                
              </div>
              <button onClick={() => handleDelete(todo.id)} className='cursor-pointer'>
                <FaTrashAlt className='md:mr-4 w-6 h-6' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TasksPage