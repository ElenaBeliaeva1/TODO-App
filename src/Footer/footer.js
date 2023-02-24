import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter/taskFilter'
import './footer.css'

const Footer = ({ itemsLeftCount, clearingTaskList, addFilterAll, addFilterActive, addFilterComplete }) => (
  <footer className="footer">
    <div className="todo-count">{itemsLeftCount} items left</div>

    <TaskFilter addFilterAll={addFilterAll} addFilterActive={addFilterActive} addFilterComplete={addFilterComplete} />

    <button className="clear-completed" onClick={() => clearingTaskList()}>
      Clear completed
    </button>
  </footer>
)

Footer.propTypes = {
  itemsLeftCount: PropTypes.number,
  clearingTaskList: PropTypes.func,
  addFilterAll: PropTypes.func,
  addFilterActive: PropTypes.func,
  addFilterComplete: PropTypes.func,
}

export default Footer
