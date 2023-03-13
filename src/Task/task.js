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
    deletingTask: PropTypes.func,
    min: PropTypes.number,
    sec: PropTypes.number,
  }

  static defaultProps = {
    description: 'text',
    filtered: false,
    completed: false,
    created: new Date(),
    id: 1,
  }

  state = {
    min: this.props.min,
    sec: this.props.sec,
    timer: null,
    formattedTime: '00:00:00',
  }

  startTimer = () => {
    if (!this.state.timer) {
      console.log(this.state.min, this.state.sec)
      let totalSeconds = this.state.min * 60 + this.state.sec
      if (totalSeconds <= 0) {
        this.pauseTimer()
        return
      }
      const newTimer = setInterval(() => {
        if (this.state.min * 60 + this.state.sec <= 0) {
          this.pauseTimer()
          return
        }
        if (this.state.sec >= 1) {
          this.setState(() => {
            return {
              sec: this.state.sec - 1,
            }
          })
        } else {
          this.setState(() => {
            return {
              min: this.state.min - 1,
              sec: this.state.sec + 59,
            }
          })
        }
      }, 1000)
      this.setState({ timer: newTimer })
    }
  }

  pauseTimer = () => {
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
  }

  pad = (val) => {
    let valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
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
          <div className="timer">
            <p id="timer">{`${this.pad(this.state.min)}:${this.pad(this.state.sec)}`}</p>
            <button id="startBtn" className="icon-timer icon-start" onClick={() => this.startTimer()} />
            <button id="pauseBtn" className="icon-timer icon-pause" onClick={() => this.pauseTimer()} />
          </div>
          <span className="created">{formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={deletingTask}></button>
        <input type="text" className="edit" />
      </div>
    )
  }
}
