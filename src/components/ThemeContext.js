import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const cookie_theme = Cookies.get("theme");
  const [theme, setTheme] = useState(cookie_theme ? cookie_theme : "light"); // Initial theme

  const toggleTheme = () => {
    Cookies.set("theme", theme === "light" ? "dark" : "light");
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
