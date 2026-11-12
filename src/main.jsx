import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Options from './Options.jsx'
const FaceUnlockPage = React.lazy(() => import('./FaceUnlockPage.jsx'))
const isFaceUnlock = location.pathname.replace(/\/+$/, '').toLowerCase() === '/faceunlock'
import { MotionConfig } from 'framer-motion'
import 'lenis/dist/lenis.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      {isFaceUnlock ? (
        <React.Suspense fallback={null}><FaceUnlockPage /></React.Suspense>
      ) : location.search.includes('options') ? <Options /> : <App />}
    </MotionConfig>
  </React.StrictMode>,
)


