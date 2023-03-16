import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/task'
import './taskList.css'

const TodoList = ({ todos, deletingTask, completingTask }) => {
  const elements = todos.map((item) => {
    const { id, ...itemsProps } = item
    return (
      <Task
        key={id}
        {...itemsProps}
        deletingTask={() => {
          deletingTask(id)
        }}
        completingTask={() => {
          completingTask(id)
        }}
      />
    )
  })
  return <div className="todo-list main">{elements}</div>
}

TodoList.propTypes = {
  todos: PropTypes.array,
  deletingTask: PropTypes.func,
  completingTask: PropTypes.func,
}

export default TodoList
