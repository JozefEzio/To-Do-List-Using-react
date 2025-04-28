import { useEffect, useState } from "react"

function ToDoList() {
    let [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [mode, setMode] = useState('create')
    const [indexU, setIndexU] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        let data = window.localStorage.getItem('Tasks')
        if (data) {
            setTasks(JSON.parse(data))
        }
    }, [])
    useEffect(() => {
        if (tasks.length > 0) {
            window.localStorage.setItem('Tasks', JSON.stringify(tasks))
        }
    }, [tasks])
    const handleInput = (e) => {
        setNewTask(e.target.value)
    }
    const handleTask = (e) => {
        if (e.key === 'Enter') {
            if (newTask) {
                if (newTask.length > 54) {
                    setErrorMessage('The task is very long!!')
                } else {
                    if (mode === 'create') {
                        setTasks(t => [...t, newTask])
                        setNewTask('')
                    }
                    else {
                        setTasks(tasks.map((t, i) => i === indexU ? newTask : t))
                        setMode('create')
                        setNewTask('')
                        setIndexU(null)
                    }
                    setErrorMessage('')
                }
            }
            else {
                setErrorMessage('Please enter a task!')

            }
        }
    }
    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index))
    }
    const handleUpdate = (index) => {
        setMode('update')
        setNewTask(tasks[index])
        setIndexU(index)
    }
    const handleOnClick=(e)=>{
        e.target.style.backgroundColor='#15fa34c9'
    }
    const handleOnDoubleClick=(e)=>{
        e.target.style.backgroundColor='#fa3924c9'

    }
    return (
        <>
            <div className="ToDoList">
                <div className="input">
                    <input type="text" placeholder="Add Task" id="input" onKeyDown={handleTask} value={newTask} onChange={handleInput} />
                    <p id="errorfield">{errorMessage}</p>
                </div>
                <div className="tasks">
                    <ul>
                        {tasks.map((task, i) => <li key={i} onClick={handleOnClick} onDoubleClick={handleOnDoubleClick}><span>{task}</span><span><i className="fa-solid fa-pen-to-square pen" onClick={() => handleUpdate(i)} ></i><i className="fa-solid fa-trash trash" onClick={() => handleDelete(i)}></i></span></li>)}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default ToDoList






