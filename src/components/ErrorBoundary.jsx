import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null }

  static getDerivedStateFromError(error) {
    return { error, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo: errorInfo?.componentStack ?? '' })
    console.error('Presentation render error:', error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: '2rem',
            color: '#e8fff2',
            background: '#030806',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', margin: '0 0 1rem' }}>This deck hit a render error</h1>
          <pre
            style={{
              fontSize: '0.8rem',
              overflow: 'auto',
              padding: '1rem',
              borderRadius: 8,
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(0,255,136,0.25)',
            }}
          >
            {this.state.error?.message ?? String(this.state.error)}
            {this.state.errorInfo ? `\n\n${this.state.errorInfo}` : ''}
          </pre>
          <p style={{ opacity: 0.85, marginTop: '1.25rem', maxWidth: '48ch' }}>
            Reload the page. If it happens on a specific slide, note the slide number (footer) so it can be fixed.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
