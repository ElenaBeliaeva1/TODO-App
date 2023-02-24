import React from 'react'
import './taskFilter.css'
import PropTypes from 'prop-types'

const TaskFilter = ({ addFilterAll, addFilterActive, addFilterComplete }) => (
  <ul className="filters">
    <li>
      <button className="selected" onClick={() => addFilterAll()}>
        All
      </button>
    </li>
    <li>
      <button onClick={() => addFilterActive()}>Active</button>
    </li>
    <li>
      <button onClick={() => addFilterComplete()}>Completed</button>
    </li>
  </ul>
)
TaskFilter.propTypes = {
  addFilterAll: PropTypes.func,
  addFilterActive: PropTypes.func,
  addFilterComplete: PropTypes.func,
}

export default TaskFilter
