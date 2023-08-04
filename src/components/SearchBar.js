import * as React from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import { InputBase, Paper } from "@mui/material";
import Popper from "@mui/material/Popper";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";


const GroupHeader = styled("div")(() => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.text.main,
  backgroundColor: theme.palette.secondary.main,
}));

const GroupItems = styled("ul")({
  padding: 0,
  color: theme.palette.text.main,
  backgroundColor: theme.palette.background.main,
});

function SearchBar({ width, height }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function getReviews() {
      //Request node server for classes named inputValye
      await axios
        .get(process.env.REACT_APP_NODE_SERVER + `/query-course/${inputValue}`)
        .then((response) => {
          setOptions(response.data);
        })
        .catch((error) => console.error(error));
    }
    if (inputValue != "" || inputValue != "") getReviews();

    return () => {
      active = false;
    };
  }, [value, inputValue]); //only triggered when value, inoutValue changes

  //Documentation for <Autocomplete/> component
  //https://mui.com/material-ui/react-autocomplete/#search-as-you-type
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="UCR_Class_Searchbar"
        getOptionLabel={(option) => option.class_name}
        isOptionEqualToValue={(option, value) =>
          option.class_name === value.class_name
        }
        PopperComponent={(props) => (
          <Popper {...props} style={{ paddingTop: "8px", width: width }}>
            <Paper style={{ maxHeight: "300px", overflowY: "auto" }}>
              {props.children}
            </Paper>
          </Popper>
        )}
        filterOptions={(x) => x}
        options={options.sort()}
        groupBy={(option) => option.subject_code}
        autoComplete
        freeSolo
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No course"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          //when a user selects and option the components onChange event is called
          //Here we navigate the user to the route '/Course/:course'
          //This route will draw the <ClassPage/> component fro classPage.js
          navigate(
            `/Course/${newValue.subject_code}/${newValue.course_number}`
          );
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
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
                bgcolor:'background.main',
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
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          );
        }}
        renderOption={(props, option) => {
          const matches = match(option.class_name + " " + option.course_title, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.class_name + " " + option.course_title, matches);

          return (
            <li {...props}>
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
