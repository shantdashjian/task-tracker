import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from "react";
import AddTask from './components/AddTask'
import Footer from "./components/Footer";
import About from './components/About'

function App() {
  const [tasks, setTasks] = useState([
    {
      "id": 3,
      "text": "Run",
      "day": "Jan 23, 2012",
      "reminder": false
    },
    {
      "id": 4,
      "text": "Fly",
      "day": "Jan 23, 2012",
      "reminder": true
    }
  ])

  const [showAddTask, setShowAddTask] = useState(false)

  const onDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const onToggle = (id) => {
    let task = tasks.find(task => task.id === id);
    const updatedTask = { ...task, reminder: !task.reminder }
    setTasks(tasks.map(task =>
      task.id === id ? updatedTask : task
    ))
  }

  const generateId = () => {
    // 1. get all the ids from the tasks array
    const ids = tasks.map(task => task.id)
    // 2. get the max of the ids
    const maxId = Math.max(...ids)
    // 3. add 1 to the max
    const newId = maxId + 1
    // 4. return it
    return newId
  }
  const addTask = (task) => {
    const taskWithId = {...task, id: generateId()}
    setTasks([...tasks, taskWithId])
  }

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router basename="/task-tracker">
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
