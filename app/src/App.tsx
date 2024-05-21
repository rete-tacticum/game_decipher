import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./components/ErrorFallback";
import DecipherGame from "./components/DecipherGame";

import { ConfigParams } from "./logic/types";

function App() {
  const defaultParams: ConfigParams = {
    difficulty: 1,
    language: "eng",
    timeout: 0,
    tries: 5,
  };
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DecipherGame {...defaultParams} />
      </ErrorBoundary>
    </>
  );
}

export default App;
