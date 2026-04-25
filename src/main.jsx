import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function DemoApp() {
  return (
    <main className="demo-route-shell">
      <section className="demo-route-frame-wrap">
        <iframe className="demo-route-frame" src="/demo-shell.html" title="SAVIOUR Demo" />
      </section>
    </main>
  )
}

const isDemoRoute = window.location.pathname.startsWith('/demo')
const RootComponent = isDemoRoute ? DemoApp : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
)
