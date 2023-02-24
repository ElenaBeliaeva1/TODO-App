import React from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  static propTypes = {
    filtered: PropTypes.bool,
    completingTask: PropTypes.func,
    completed: PropTypes.bool,
    description: PropTypes.string,
    created: PropTypes.bool,
    deletingTask: PropTypes.func,
  }

  static defaultProps = {
    description: 'text',
    filtered: false,
    completed: false,
    created: new Date(),
    id: 1,
  }

  render() {
    const { completingTask, completed, filtered } = this.props
    const checked = completed
    let classNamesTask = 'task'

    if (completed) {
      classNamesTask += ' completed'
    }

    if (filtered) {
      classNamesTask += ' filtered'
    }

    const { description, created, deletingTask } = this.props

    return (
      <div className={classNamesTask}>
        <input className="toggle" type="checkbox" onChange={completingTask} checked={checked} />
        <label>
          <span className="description" onClick={completingTask}>
            {description}
          </span>
          <span className="created">{formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={deletingTask}></button>
        <input type="text" className="edit" />
      </div>
    )
  }
}
