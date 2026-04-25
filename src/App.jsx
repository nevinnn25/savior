import ErrorBoundary from './components/ErrorBoundary'
import Presentation from './components/Presentation'

function App() {
  return (
    <ErrorBoundary>
      <Presentation />
    </ErrorBoundary>
  )
}

export default App
