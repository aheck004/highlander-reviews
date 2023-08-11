import { ThemeProvider, createTheme } from "@mui/material/styles";

export const themes = {
  light: createTheme({
    palette: {
      primary: {
        main: '#285292',
        contrastText: '#f6fcfe',
      },
      secondary: {
        main: '#DEEAED',
        contrastText: '#041216',
      },
      background: {
        main: '#f6fcfe',
        contrastText: '#041216',
      },
      text: {
        main: '#041216',
      },
      accent: {
        main: '#4F767D',
        contrastText: '#f6fcfe',
      },
      divider: "#4F767D",
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
      name: {
        main: 'light'
      }
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
        main: '#121E21',
        contrastText: '#f6fcfe',
      },
      background: {
        main: '#050505',
        contrastText: '#f6fcfe',
      },
      text: {
        main: '#f6fcfe',
      },
      accent: {
        main: '#A1BFC4',
        contrastText: '#041216',
      },
      divider: "#A1BFC4",
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
      name: {
        main: 'dark'
      }
    },
  }),

  //

};