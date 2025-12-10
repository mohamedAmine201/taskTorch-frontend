import React, {useState} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from  './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import TasksPage from './components/pages/TasksPage'
import TaskPage from './components/pages/TaskPage'
import ProtectedRoute  from './components/ProtectedRoute'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>,
      children: [
        {index: true, element: <HomePage />},
        {path: 'login/', element: <LoginPage />},
        {path: 'register/', element: <RegisterPage />},
        {
            path: 'tasks/',
            element: (
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TasksPage />
              </ProtectedRoute>
            ),
          },
        {
          path: 'tasks/:id',
          element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <TaskPage />
          </ProtectedRoute>
        )}
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App