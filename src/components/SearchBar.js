import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ClassIcon from '@mui/icons-material/Class';
import Grid from '@mui/material/Grid';

import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

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
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No course"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for course" fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <Grid container alignItems="center">
            <Grid item sx={{ display: 'flex', width: 44 }}>
              <ClassIcon sx={{ color: 'text.secondary' }} />
            </Grid>
            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
              <Box
                key={option.course_name}
                component="span"
                sx={{ fontWeight: 'regular' }}
              >
                {option.course_name}
              </Box>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

export default SearchBar