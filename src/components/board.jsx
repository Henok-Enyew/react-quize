import { useEffect, useState } from 'react';
import Task from './Task';
import Modal from './modal/modal'; 
import '../App.css';

const Board = () => {
  const [totalTasks, setTotalTasks] = useState(2);
  const [tasks, setTasks] = useState([ 
    { id: 0, name: 'Task 1', status: 'Pending' },
    { id: 1, name: 'Task 2', status: 'Pending' }
  ]);
  const [trigger, setTrigger] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); 

  const increment = () => {
    setTimeout(() => {
      const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : -1;
      const newTask = { id: maxId + 1, name: Task ${maxId + 2}, status: 'Pending' };
      setTasks([...tasks, newTask]); 
      setTotalTasks(totalTasks + 1);
    }, 0);
  };

  const removeTask = (id) => {
    setTotalTasks(totalTasks - 1);
    
    sessionStorage.removeItem(task-${id});
  
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setTrigger(true);
  };

  return (
    <div className="container">
      <h2>Tasks ({totalTasks})</h2>
      {/* onclick make this button to show the existing tasks with a drop down menu and onclick(tasks)
       it should clone the existing name and status -should be added to the tasks array  */}
      <button>Clone Task</button>
      <button onClick={increment}>Create Task</button>
      <ul className='tasks'>
        {tasks.map((task) => (
          <li key={task.id} className='task' onClick={() => openModal(task)}>
            <Task id={task.id} />
            <button className="btn" onClick={(e) =>
               { e.stopPropagation();
                removeTask(task.id);}}>&times;</button>
          </li>
        ))}
      </ul>
      <Modal 
        trigger={trigger} 
        setTrigger={setTrigger} 
        tasks={selectedTask || {}} 
      />
    </div>
  );
};

export default Board;