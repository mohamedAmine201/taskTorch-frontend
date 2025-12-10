import React, {useEffect} from 'react'
import MainLayout from '../../layouts/MainLayout'
import Hero from '../Hero'
import CallToAction from '../CallToAction'

const HomePage = () => {
  useEffect(() => {
    const fetchTodos = () => {
      fetch("https://tasktorch-todoapp.onrender.com/api/todo/1")
        .then(response => response.json())
        .then(data => {
          console.log("Fetched todos:", data);
        })
        .catch(error => {
          console.error("Error fetching todos:", error);
        });
    };

    // Run once on mount
    fetchTodos();

    // Keep fetching every 10 minutes
    setInterval(fetchTodos, 10 * 60 * 1000);
  }, []);
  return (
    <>
      <Hero />
      <CallToAction />
    </>
  )
}

export default HomePage