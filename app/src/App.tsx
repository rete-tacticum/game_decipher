import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './components/ErrorFallback';

import DecipherGame from './components/DecipherGame';


function App() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
        <DecipherGame
          language='latin'
          timeout={100}
          difficulty={3}
          tries={5}
        />
      </ErrorBoundary>
    </>
  )
}

export default App
