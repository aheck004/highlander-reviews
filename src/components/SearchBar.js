import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ClassIcon from '@mui/icons-material/Class';
import Grid from '@mui/material/Grid';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    let active = true;

    async function getReviews() {
      await axios.get(process.env.REACT_APP_NODE_SERVER+`/query-course/${inputValue}`)
      .then(response => {
        setOptions(response.data)
      })
      .catch(error => console.error(error));
    }
    if (inputValue != '')
      getReviews()

    return () => {
      active = false;
    };
  }, [value, inputValue]);

  return (
    <Autocomplete
      id="UCR_Class_Searchbar"
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.course_name
      }
      isOptionEqualToValue={(option, value) => 
        option.course_name === value.course_name
      }
      filterOptions={(x) => x}
      options={options}
      groupBy={(option) => option.subject_code}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No course"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        navigate(`/Course/${newValue.course_name}`)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for course" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches = match(option.course_name, inputValue, { insideWords: true });
        const parts = parse(option.course_name, matches);

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <ClassIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
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
  );
}

export default SearchBar