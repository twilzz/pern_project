import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { UserStoreContext } from './components/StoreContext'
import './index.css'
import DeviceStore from './store/DeviceStore'
import UserStore from './store/UserStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserStoreContext.Provider
      value={{ user: new UserStore(), devices: new DeviceStore() }}
    >
      <App />
    </UserStoreContext.Provider>
  </React.StrictMode>
)
