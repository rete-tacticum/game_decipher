import React from "react";

type ThemeType = {
  colorPrimary: string;
  colorAccent: string;
  fontPrimary: string;
  baseSize: string;
  highlightColor: string;
};

const defaultTheme: ThemeType = {
  colorPrimary: "black",
  colorAccent: "lightgreen",
  fontPrimary: "VT220",
  baseSize: "1.15em",
  highlightColor: "white",
};

const ThemeContext = React.createContext<ThemeType>(defaultTheme);

const ThemeProvider: React.FC<{
  children: React.ReactNode;
  theme: ThemeType;
}> = ({ children, theme = defaultTheme }) => {
  return (
    // @ts-ignore
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

export type { ThemeType };
