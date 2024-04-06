import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { StoreContext } from './components/StoreContext'
import './global.css'
import RootStore from './store/RootStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={{ store: new RootStore() }}>
      <Router>
        <App />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>
)
