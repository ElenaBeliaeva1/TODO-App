import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import TodoApp from './TodoApp/todoApp'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(<TodoApp />)
