import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/task'
import './taskList.css'

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    deletingTask: PropTypes.func,
    completingTask: PropTypes.func,
  }

  render() {
    const { todos, deletingTask, completingTask } = this.props
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
}
