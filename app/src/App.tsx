import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./components/ErrorFallback";
import DecipherGame from "./components/DecipherGame";

import { ThemeType } from "./state/theme";
import { ConfigParams } from "./logic/types";

import "./assets/main.scss";

function App(
  { language, timeout, difficulty, tries }: ConfigParams,
  theme?: ThemeType
) {
  const basicTheme = {
    colorPrimary: "rgba(139, 255, 184, 0.85)",
    colorAccent: "rgba(20,20,40)",
    fontPrimary: "VT220",
    baseSize: "1.15rem",
    highlightColor: "rgba(255,255,255,0.25)",
  };
  const appTheme = theme && Object.keys(theme).length > 0 ? theme : basicTheme;
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DecipherGame
          difficulty={difficulty || 1}
          language={language || "eng"}
          timeout={timeout || 100}
          tries={tries || 4}
          theme={appTheme}
        />
      </ErrorBoundary>
    </>
  );
}

export default App;
