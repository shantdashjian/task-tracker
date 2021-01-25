import { FiDelete } from 'react-icons/fi'

const Task = ({ task, onDelete, onToggle }) => {
    const reminderStyle = task.reminder ? 'reminder-style' : ''
    return (
        <div className={`task ${reminderStyle}`} onDoubleClick={() => onToggle(task.id)}>
            <h3 >
                {task.text}
                <FiDelete 
                    className='delete-icon'
                    onClick={() => onDelete(task.id)}/>
            </h3>
            <p>{task.day}</p>
        </div>

    )
}

export default Task;