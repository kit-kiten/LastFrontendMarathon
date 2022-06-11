import { useState } from 'react'
import './App.css'

function Task({ task, changeTaskList }) {
    function handleClick(e) {
        e.target.parentElement.remove()
        changeTaskList(task);
    }

    return (
        <li className={'main-task'}>
            <div className="main-task__box">
                <span className="main-task__checkbox"></span>
            </div>
            <p className="main-task__text">
                {task}
            </p>
            <input className="main-task__btn" type="button" onClick={handleClick}/>
        </li>
    )
}

function List({ taskList, changeTaskList }) {

    const tasksList = taskList.map((task, index) => {
        return (
            <Task
                key={index}
                task={task}
                changeTaskList={changeTaskList}
            />
        )
    });
    return (
        <ul className={'task-list'}>
            {tasksList}
        </ul>
    )
}

function Header({ placeholder_value, changeTaskList }) {
    const [currentInput, setCurrentInput] = useState('')

    function changeInput(e) {
        setCurrentInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setCurrentInput('');
        changeTaskList(currentInput);
    }

    return (
        <form className="main-form" onSubmit={handleSubmit}>
            <div className="main-new_task">
                <input className="main-new_task__text" type="text" value={currentInput} placeholder={placeholder_value} onChange={changeInput} />
                <button className="main-new_task__btn" type="submit"></button>
            </div>
        </form>
    )
}

function Title({ status }) {
    return (
        <h2 className="main__title">{status}</h2>
    )
}

function Form({status, placeholder_value}) {
    const [list, setList] = useState([]);

    function addTask(newTask) {
        setList([...list, newTask]);
        console.log(list)
    }

    function deleteTask(task) {
        const indexTask = list.findIndex(item => item === task)

        if (indexTask !== -1) {
            setList(list.splice(indexTask, 1))
        }

        console.log(list)
    }

    return (
        <div>
            <Title status={status} />
            <Header placeholder_value={placeholder_value} changeTaskList={addTask} />
            <List
                taskList={list}
                changeTaskList={deleteTask}
            />
        </div>
    )
}

function App() {

    return (
        <main className="main">
            <div className="container">
                <Form
                    status={'high'}
                    placeholder_value={'Добавить важных дел'}
                />
                <Form
                    status={'low'}
                    placeholder_value={'Добавить'}
                />
            </div>
        </main>
    )
}

export default App;
