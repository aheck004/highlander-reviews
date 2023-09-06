import * as React from "react";
import Box from "@mui/material/Box";
import Autocomplete, {autocompleteClasses} from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";

const GroupHeader = styled("div")(({ theme }) => ({
  cursor: "pointer",
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.accent.contrastText,
  backgroundColor: theme.palette.accent.main,
}));

const GroupItems = styled("ul")(({ theme }) => ({
  padding: 0,
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
}));

function SearchBar({ width, height }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const theme = themes[useTheme().theme];

  useEffect(() => {
    let active = true;

    async function getReviews() {
      //Request node server for classes named inputValye
      await axios.create({
        withCredentials: true,
      })
        .get(process.env.REACT_APP_NODE_SERVER + `/query-course/${inputValue}`)
        .then((response) => {
          setOptions(response.data);
        })
        .catch((error) => console.error(error));
    }
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    getReviews();

    return () => {
      active = false;
    };
  }, [value, inputValue]); //only triggered when value, inoutValue changes

  //Documentation for <Autocomplete/> component
  //https://mui.com/material-ui/react-autocomplete/#search-as-you-type
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        sx={{ width: width, height: height }}
        id="UCR_Class_Searchbar"
        getOptionLabel={(option) => typeof option === 'object' ?  option.subject_code : ''}
        isOptionEqualToValue={(option, value) =>
          option.class_name === value.class_name
        }
        filterOptions={(x) => x}
        options={options}
        groupBy={(option) => option.subject_code + " - " + option.subject_description}
        autoComplete
        freeSolo
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No course"
        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue);
            if (newValue.subject_code && newValue.course_number) {
              navigate(`/Course/${newValue.subject_code}/${newValue.course_number}`);
            } else if (options.length > 0) {
              navigate(`/Course/${options[0].subject_code}`);
            }
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue ? newInputValue : ""); 
        }}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <Paper
              sx={{
                width: { width },
                height: { height },
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                borderBottomRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderTopLeftRadius: "20px",
                color: 'text.main',
                bgcolor: inputValue === "" ? 'background.main' : 'secondary.main',
                border: inputValue === "" ? `1px solid ${theme.palette.text.main}`:'0',
                margin: inputValue === "" ? '0px' : '1px',
                '&:hover': {
                  bgcolor: 'secondary.main', // Background color on hover
                  border: '0',
                  margin: '1px',
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)'
                },
              }}
            >
              <InputBase
                {...params.InputProps}
                {...rest}
                sx={{
                  paddingLeft: "20px",
                  color: 'text.main',
                }}
                placeholder="Search for Course"
                endAdornment={
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => {
                        if (options[0])
                          navigate(
                            `/Course/${options[0].subject_code}/${options[0].course_number}`
                          );
                      }}
                    >
                      <SearchIcon sx={{ color: 'text.main'}}/>
                    </IconButton>
                  </div>
                }
              />
            </Paper>
          );
        }}
        renderGroup={(params) => {
          return (
            <li key={params.group}> 
              <GroupHeader
                onClick={() => {
                  navigate(`/Course/${params.group.split(" - ")[0]}`);
                }}
                theme={theme}>{params.group}</GroupHeader>
              <GroupItems theme={theme}>{params.children}</GroupItems>
            </li>
          );
        }}
        ListboxProps={
          {
            style: {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            }
          }
        }
        renderOption={(props, option) => {
          const matches = match(option.class_name + " " + option.course_title, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.class_name + " " + option.course_title, matches);

          return (
            <li {...props} key={option.class_name}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <MenuBookIcon sx={{ color: "text.main" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </ThemeProvider>
  );
}

export default SearchBar;
