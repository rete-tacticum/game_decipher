import { ErrorBoundary } from 'react-error-boundary';

import DecipherGameContainer from './containers/DecipherGameContainer';
import ErrorFallback from './components/ErrorFallback';


function App() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
        <DecipherGameContainer
          language='latin'
        />
      </ErrorBoundary>
    </>
  )
}

export default App
