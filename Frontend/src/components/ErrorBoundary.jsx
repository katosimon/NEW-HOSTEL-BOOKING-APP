import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, info);
    // store info (componentStack) and ensure we don't drop the error
    this.setState((prev) => ({ info, error: prev.error || error }));
  }

  toggleDetails = () => this.setState((s) => ({ showDetails: !s.showDetails }));

  renderErrorDetails() {
    const { error, info } = this.state;

    // Safely get a message or stringify the error object
    const message = error && (error.message || String(error)) || 'Unknown error';
    const stack = error && (error.stack || null);
    const componentStack = info && info.componentStack;

    return (
      <div style={{ marginTop: 12, fontSize: 13 }}>
        <div style={{ color: '#b00020', whiteSpace: 'pre-wrap' }}>{message}</div>
        {stack && (
          <details style={{ marginTop: 8 }}>
            <summary style={{ cursor: 'pointer' }}>Error stack</summary>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{stack}</pre>
          </details>
        )}
        {componentStack && (
          <details style={{ marginTop: 8 }}>
            <summary style={{ cursor: 'pointer' }}>Component stack</summary>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{componentStack}</pre>
          </details>
        )}
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h1>Something went wrong.</h1>

          {/* Show a safe brief message */}
          {this.state.error ? (
            <div style={{ color: '#b00020' }}>
              {this.state.error.message || String(this.state.error)}
            </div>
          ) : (
            <div style={{ color: '#b00020' }}>An unexpected error occurred.</div>
          )}

          <div style={{ marginTop: 12 }}>
            <button onClick={() => window.location.reload()}>Reload</button>
            <button style={{ marginLeft: 8 }} onClick={this.toggleDetails}>
              {this.state.showDetails ? 'Hide details' : 'Show details'}
            </button>
          </div>

          {this.state.showDetails && this.renderErrorDetails()}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
