import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MotionConfig } from 'framer-motion'
import 'lenis/dist/lenis.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <App />
    </MotionConfig>
  </React.StrictMode>,
)


