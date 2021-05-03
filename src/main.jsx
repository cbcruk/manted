import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'jotai'
import App from './App'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
