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
  return (
      <form className="main-form">
        <div className="main-new_task">
          <input className="main-new_task__text" type="text" placeholder={props.placeholder_value} />
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

function App() {

  return (
      <main className="main">
        <div className="container">
          <Title status={'high'} />

          <Header placeholder_value={'Добавить важных дел'} />

          <List>
            <Task />
            <Task />
          </List>

          <Title status={'low'} />

          <Header placeholder_value={'Добавить'}/>

          <List>
            <Task />
            <Task />
          </List>
        </div>
      </main>
  )
}

export default App
