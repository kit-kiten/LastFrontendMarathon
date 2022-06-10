import { useState } from 'react'
import './App.css'

function Task() {
  return (
      <li className={'main-task'}>
         <div className="main-task__box">
             <span className="main-task__checkbox"></span>
         </div>
         <p className="main-task__text">Таск</p>
         <input className="main-task__btn" type="button" />
      </li>
  )
}

function List(props) {
  return (
      <ul className={'task-list'}>
        {props.children}
      </ul>
  )
}

function Header(props) {
    const [currentInput, setCurrentInput] = useState('')

    function changeInput(e){
        setCurrentInput(e.target.value)
        console.log(currentInput)
    }

    return (
       <form className="main-form">
          <div className="main-new_task">
            <input className="main-new_task__text" type="text" placeholder={props.placeholder_value} onChange={changeInput}/>
            <button className="main-new_task__btn" type="submit"></button>
          </div>
       </form>
    )
}

function Title(props) {
  return (
      <h2 className="main__title">{props.status}</h2>
  )
}

function Form(props) {
    return (
        <div>
            <Title status={props.status} />
            <Header placeholder_value={props.placeholder_value} onSubmit={props.changeTaskList}/>
            <List>
                <Task />
                <Task />
            </List>
        </div>
    )
}

function App() {
    const [list, setList] = useState([])

    function addTask(e){
        e.preventDefault()
        setList(e.target.value)
        console.log(list)
    }

    return (
       <main className="main">
          <div className="container">
              <Form status={'high'} placeholder_value={'Добавить важных дел'} changeTaskList={addTask} />
              <Form status={'low'} placeholder_value={'Добавить'} changeTaskList={addTask}/>
          </div>
       </main>
    )
}

export default App
