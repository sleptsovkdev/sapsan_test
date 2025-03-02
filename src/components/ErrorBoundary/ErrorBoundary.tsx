import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div
    role="alert"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: 'white',
      padding: '20px',
    }}>
    <h2>Что-то пошло не так:</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary} type="button">
      Попробовать снова
    </button>
  </div>
)

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
