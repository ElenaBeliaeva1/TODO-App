import React, { useState, useRef } from 'react'

import NewTaskForm from '../NewTaskForm/newTaskForm'
import TaskList from '../TaskList/taskList'
import Footer from '../Footer/footer'
import './todoApp.css'

const TodoApp = () => {
  const [todos, setTodos] = useState([])
  const maxId = useRef(100)
  const createTask = (text, min, sec) => {
    const date = new Date()
    maxId.current += 1
    const newItem = {
      description: text,
      filtered: false,
      completed: false,
      created: date,
      id: maxId.current,
      min: min,
      sec: sec,
    }
    return newItem
  }
  const deletingTask = (id) => {
    setTodos((todos) => {
      const newTodos = todos.filter((el) => el.id !== id)
      return [...newTodos]
    })
  }
  const addingTask = (text, min, sec) => {
    setTodos((todos) => {
      const newItem = createTask(text, min, sec)
      const newTodos = [...todos, newItem]
      return [...newTodos]
    })
  }
  const completingTask = (id) => {
    setTodos((todos) => {
      const idx = todos.findIndex((el) => el.id === id)
      const oldItem = todos[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      const newTodos = todos
      newTodos[idx] = newItem
      return [...newTodos]
    })
  }
  const clearingTaskList = () => {
    setTodos(todos.filter((el) => el.completed === false))
  }
  const addFilterAll = () => {
    setTodos(
      todos.map((elem) => {
        const result = { ...elem, filtered: false }
        return result
      })
    )
  }
  const addFilterActive = () => {
    const newArr = todos.map((elem) => {
      let result
      if (elem.completed) {
        result = { ...elem, filtered: true }
      } else {
        result = { ...elem, filtered: false }
      }
      return result
    })
    setTodos(newArr)
  }
  const addFilterComplete = () => {
    const newArr = todos.map((elem) => {
      let result
      if (elem.completed) {
        result = { ...elem, filtered: false }
      } else {
        result = { ...elem, filtered: true }
      }
      return result
    })

    setTodos(newArr)
  }
  const itemsLeftCount = todos.filter((el) => el.completed === false).length
  return (
    <section className="todoapp">
      <NewTaskForm addingTask={addingTask} />

      <TaskList todos={todos} deletingTask={deletingTask} completingTask={completingTask} />

      <Footer
        itemsLeftCount={itemsLeftCount}
        clearingTaskList={clearingTaskList}
        addFilterAll={addFilterAll}
        addFilterActive={addFilterActive}
        addFilterComplete={addFilterComplete}
      />
    </section>
  )
}

export default TodoApp
