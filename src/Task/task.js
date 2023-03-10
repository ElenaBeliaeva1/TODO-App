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

  state = {
    time: 0,
    timerInterval: 0,
    formattedTime: '00:00:00',
  }

  updateTimer = async () => {
    const newTime = this.state.time + 1
    await this.setState(() => {
      return {
        time: newTime,
      }
    })
    const hours = Math.floor(this.state.time / 3600)
    const minutes = Math.floor((this.state.time % 3600) / 60)
    const seconds = this.state.time % 60
    const newFormattedTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`
    this.setState({
      formattedTime: newFormattedTime,
    })
  }

  startTimer = async () => {
    if (!this.state.timerInterval) {
      const newTimerInterval = setInterval(this.updateTimer, 1000)
      await this.setState(() => {
        return {
          timerInterval: newTimerInterval,
        }
      })
    }
  }

  pauseTimer = () => {
    clearInterval(this.state.timerInterval)
    this.setState({ timerInterval: 0 })
  }

  resetTimer = () => {
    clearInterval(this.state.timerInterval)
    this.setState({ time: 0, timerInterval: 0, formattedTime: '00:00:00' })
  }

  pad = (number) => {
    if (number < 10) {
      return `0${number}`
    } else {
      return number
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
          <div>
            <p id="timer">{this.state.formattedTime}</p>
            <button id="startBtn" className="icon-timer icon-start" onClick={() => this.startTimer()}>
              Старт
            </button>
            <button id="pauseBtn" className="icon-timer icon-pause" onClick={() => this.pauseTimer()}>
              Пауза
            </button>
            <button id="resetBtn" className="icon-timer icon-reset" onClick={() => this.resetTimer()}>
              Сбросить
            </button>
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
