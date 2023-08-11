import { ThemeProvider, createTheme } from "@mui/material/styles";

export const themes = {
  light: createTheme({
    palette: {
      primary: {
        main: '#285292',
        contrastText: '#f6fcfe',
      },
      secondary: {
        main: '#cadde2',
        contrastText: '#041216',
      },
      background: {
        main: '#f6fcfe',
      },
      text: {
        main: '#041216',
      },
      accent: {
        main: '#4E757E',
        contrastText: '#f6fcfe',
      },
      divider: "#4E757E",
      difficultyColor1: {
          main: '#00c853',
          contrastText: '#041216'
      },
      difficultyColor2: {
          main: '#00c853',
          contrastText: '#041216'
      },
      difficultyColor3: {
          main: '#ffd600',
          contrastText: '#041216'
      },
      difficultyColor4: {
          main: '#ff6d00',
          contrastText: '#f6fcfe'
      },
      difficultyColor5: {
          main: '#d50000',
          contrastText: '#f6fcfe'
      },
    },
  }),
  
  //

  dark: createTheme({
    palette: {
      primary: {
        main: '#285292',
        contrastText: '#f6fcfe',
      },
      secondary: {
        main: '#cadde2',
        contrastText: '#f6fcfe',
      },
      background: {
        main: '#041216',
      },
      text: {
        main: '#f6fcfe',
      },
      accent: {
        main: '#4E757E',
        contrastText: '#041216',
      },
      divider: "#4E757E",
      difficultyColor1: {
          main: '#00c853',
          contrastText: '#041216'
      },
      difficultyColor2: {
          main: '#00c853',
          contrastText: '#041216'
      },
      difficultyColor3: {
          main: '#ffd600',
          contrastText: '#041216'
      },
      difficultyColor4: {
          main: '#ff6d00',
          contrastText: '#f6fcfe'
      },
      difficultyColor5: {
          main: '#d50000',
          contrastText: '#f6fcfe'
      },
    },
  }),

  //

};