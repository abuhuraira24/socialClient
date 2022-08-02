import { useContext } from "react";

import { AuthContext } from "../../context/auth";

import { ThemeProvider } from "styled-components";

import { dark, light } from ".";

const Theme = ({ children }) => {
  let { isDark } = useContext(AuthContext);

  return (
    <ThemeProvider theme={isDark === "dark" ? dark : light}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
