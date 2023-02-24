import React from 'react'
import './newTaskForm.css'
import PropTypes from 'prop-types'

const NewTaskForm = ({ addingTask }) => (
  <div>
    <h1 className="taskForm-title">todos</h1>
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          addingTask(e.target.value, '5 minutes ago')
          e.target.value = ''
        }
      }}
    ></input>
  </div>
)

NewTaskForm.propTypes = {
  addingTask: PropTypes.func,
}

export default NewTaskForm
