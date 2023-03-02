import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { initCometChat } from './Chat.Service'

const alchemyId = process.env.ALCHEMY_ID;
initCometChat().then(() => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  )
})
