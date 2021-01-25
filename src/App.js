import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from "react";
import AddTask from './components/AddTask'
import Footer from "./components/Footer";
import About from './components/About'

function App() {
  const [tasks, setTasks] = useState([])

  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    return data;
  }

  const onDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter(task => task.id !== id))
  }

  const onToggle = async (id) => {
    let task = tasks.find(task => task.id === id);
    const updatedTask = { ...task, reminder: !task.reminder }

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    });
    const data = await response.json()

    setTasks(tasks.map(task =>
      task.id === id ? data : task
    ))
  }

  const addTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });
    const data = await response.json()
    setTasks([...tasks, data])
  }

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="container">
        <Header
          onClick={toggleShowAddTask}
          showAddTask={showAddTask}
        />

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            <Tasks
              tasks={tasks}
              onDelete={onDelete}
              onToggle={onToggle} />
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
