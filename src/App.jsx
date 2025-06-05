import Vector1 from '../src/assets/coding.svg';
import Vector2 from '../src/assets/studying.svg';
import PromodoTime from './Components/PromodoTime';
import React, { useState, useEffect } from 'react';
import './scrollHidden.css'
import TaskList from './Components/TaskList';

const App = () => {

  const [isStart, setIsStart] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });



  useEffect(()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])


    /**
   * This function handles the addition of a new task
   */
   const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks(prevTask => [
        ...prevTask,
        {
          id: Date.now(),
          text: taskInput,
          isCompleted: false

        }
      ]);
      setTaskInput('');
    }
   };

  //  Handle Toggle task that is Completed

   const toogleTask = (id) => {
    setTasks(prevTask => 
      prevTask.map(task=> task.id === id ? {...task, isCompleted: !task.isCompleted} : task)
    );
   };

    // Delete task
      const filteredDeletedTask = (id) => {
        setTasks(prevTask => prevTask.filter(task => task.id !== id));
      }

  //  filter Task for Completed
   





  return (
    <div className='min-h-screen bg-gray-700 flex flex-col items-center justify-center'>

      {/* Hero Banner */}
      <div className='flex text-center justify-center font-bold font-serif items-center bg-gray-200 text-3xl p-5 rounded-xl shadow w-full max-w-5xl'>
        Be Productive Madafaker 🖕
      </div>


 
      <img 
      src={Vector1} 
      alt="Coding" 
      className='absolute top-20 left-60 w-80 h-72 object-cover pointer-events-none select-none opacity-70 hidden  lg:block'
      />

    <img 
      src={Vector2} 
      alt="studying" 
      className='absolute top-200 left-385 w-80 h-72 object-cover pointer-events-none select-none opacity-70 hidden lg:block'
      />



      {/* Input for Todo List */}
      <div className='flex items-center justify-center mt-6 w-full max-w-5xl gap-4'>
          <input type="text"
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
          className='p-5 rounded-xl border text-2xl border-white shadow flex-grow text-white'
          placeholder='Enter your task here ...'
          />

          <button className='bg-purple-500 text-white p-4 rounded-xl shadow' onClick={handleAddTask}>
              Add Task
          </button>
      </div>



      {/* Div Containing Promodo and Todo-list */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl h-[80vh] sm:h-[50vh] mt-6'>
        {/* Todo List */}
          <div className='flex flex-col text-center bg-gray-400 p-6 rounded-xl overflow-y-scroll shadow scroll-hidden'>
            <h1 className='text-4xl text-purple-500 bg-gray-200 font-bold rounded-xl p-6 sticky top-0'>Todo List</h1>  
            <div className='flex flex-col gap-5 mt-4 items-center justify-center '>
                {/* Task List */}
                <TaskList tasks={tasks} toogleTask={toogleTask} onDelete={filteredDeletedTask}/>
            </div>
            
          </div>


        {/* Promodo Timer */}
          <div className='flex flex-col gap-7 text-center bg-gray-400 p-6 rounded-xl shadow'>
            <h1 className='text-4xl text-purple-500 bg-gray-200 font-bold rounded-xl p-6'>Promodo Timer</h1>  

            <div className='flex items-center justify-center m-auto'>
                <PromodoTime isStart={isStart}/>
            </div>

            <button className='bg-purple-500 text-white font-bold p-4 rounded-xl shadow mt-auto' onClick={()=> setIsStart(!isStart)}>
              {isStart ? "Stop Timer" : "Start Timer"}
            </button>  
          </div>
      </div>
      
    </div>
  )
}

export default App
