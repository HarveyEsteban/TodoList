import React from 'react'
import { FaTrash } from 'react-icons/fa'
const TaskList = ({tasks, toogleTask, onDelete}) => {
  return (
    <ul className='flex flex-col gap-2 text-3xl justify-center w-full'>
      {tasks.map(task => (
        <li key={task.id} className='flex flex-row justify-between gap-4 text-3xl w-full items-center  rounded-xl p-4 bg-[#9354ad]'>
          <label htmlFor="task"
          className={`mr-auto ${task.isCompleted ? 'line-through' : ''}  w-full`}
          >{task.text}
          
          </label>
            <input type="checkbox"
            className='w-10 h-10'
            name='task'
            checked={task.isCompleted} 
            onChange={()=> toogleTask(task.id)}
            />
          <button
            onClick={() => onDelete(task.id)}
          >
            <FaTrash 
              className='w-10 h-10 text-red-400'
            />
          </button>
          
   

            
        </li>
      ))}
    </ul>
  )
}

export default TaskList
