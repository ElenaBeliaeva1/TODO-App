import React, { useState, useEffect, useRef } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task2 = ({ completingTask, completed, filtered, description, created, deletingTask, min, sec }) => {
  const [time, setTime] = useState({
    minutes: min,
    seconds: sec,
  })
  const [timer, setTimer] = useState(null)
  const timeRef = useRef(time)

  useEffect(() => {
    timeRef.current = time
  }, [time])

  const startTimer = () => {
    if (!timer) {
      let totalSeconds = time.minutes * 60 + time.seconds
      if (totalSeconds <= 0) {
        pauseTimer()
        return
      }
      const newTimer = setInterval(() => deletingSecond(), 1000)
      setTimer(newTimer)
    }
  }

  const deletingSecond = () => {
    if (time.minutes * 60 + time.seconds <= 0) {
      pauseTimer()
      return
    }
    if (timeRef.current.seconds > 0) {
      setTime((time) => {
        return { ...time, seconds: time.seconds - 1 }
      })
    } else if (timeRef.current.seconds == 0) {
      setTime((time) => {
        return { minutes: time.minutes - 1, seconds: time.seconds + 59 }
      })
    }
  }

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }
  let classNamesTask = 'task'
  if (completed) {
    classNamesTask += ' completed'
  }
  if (filtered) {
    classNamesTask += ' filtered'
  }

  const pad = (val) => {
    let valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
  }
  return (
    <div className={classNamesTask}>
      <input className="toggle" type="checkbox" onChange={completingTask} checked={completed} />
      <label>
        <span className="description" onClick={completingTask}>
          {description}
        </span>
        <div className="timer">
          <p id="timer">{`${pad(timeRef.current.minutes)}:${pad(timeRef.current.seconds)}`}</p>
          <button id="startBtn" className="icon-timer icon-start" onClick={() => startTimer()} />
          <button id="pauseBtn" className="icon-timer icon-pause" onClick={() => pauseTimer()} />
        </div>
        <span className="created">{formatDistanceToNow(created)} ago</span>
      </label>
      <button className="icon icon-edit"></button>
      <button
        className="icon icon-destroy"
        onClick={() => {
          deletingTask()
          pauseTimer()
        }}
      ></button>
      <input type="text" className="edit" />
    </div>
  )
}

Task2.propTypes = {
  filtered: PropTypes.bool,
  completingTask: PropTypes.func,
  completed: PropTypes.bool,
  description: PropTypes.string,
  deletingTask: PropTypes.func,
  min: PropTypes.number,
  sec: PropTypes.number,
}

export default Task2
