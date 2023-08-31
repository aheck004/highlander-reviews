import * as React from 'react';
import { useTheme } from './ThemeContext';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { themes } from './themes';
import { Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";


export default function SubjectSearchBar({width, height}) {
  const [value, setValue] = React.useState(null);
  const theme = themes[useTheme().theme];

  return (
    <Autocomplete
      sx={{ width: width, height: height }}
      disablePortal
      id="combo-box-demo"
      options={subjectList}
      freeSolo
      getOptionLabel={(option) => option.subject_description}
      onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue.subject_code);
            window.location.href = `#/Course/${newValue.subject_code}`;
          }
        }}
      ListboxProps={{
          style: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }}
      }
      renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <Paper
              sx={{
                width: width,
                height: height ,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                borderBottomRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderTopLeftRadius: "20px",
                color: 'text.main',
                bgcolor: 'background.main',
                border: `1px solid ${theme.palette.text.main}`,
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
                placeholder="Search for Subject"
                endAdornment={
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <SearchIcon sx={{ color: 'text.main'}}/>
                  </div>
                }
              />
            </Paper>
          );
        }}

      renderOption={(props, option) => {
          return (
            <li {...props} key={option.class_name}>
              <Grid container alignItems="center">
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  <Typography>
                    {option.subject_description}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
    />
  );
}

const subjectList = [{"subject_code":"AHS","subject_description":"Art History"},{"subject_code":"ANTH","subject_description":"Anthropology"},{"subject_code":"ARBC","subject_description":"Arabic Language"},{"subject_code":"ARC","subject_description":"Academic Resource Center"},{"subject_code":"ARLC","subject_description":"Arabic Literatures and Culture"},{"subject_code":"ART","subject_description":"Art"},{"subject_code":"AST","subject_description":"Asian Studies"},{"subject_code":"BCH","subject_description":"Biochemistry"},{"subject_code":"BIEN","subject_description":"Bioengineering"},{"subject_code":"BIOL","subject_description":"Biology"},{"subject_code":"BLKS","subject_description":"Black Study"},{"subject_code":"BMSC","subject_description":"Biomedical Sciences"},{"subject_code":"BPHY","subject_description":"Biophysics"},{"subject_code":"BPSC","subject_description":"Botany/Plant Science"},{"subject_code":"BSWT","subject_description":"Basic Writing"},{"subject_code":"BUAS","subject_description":"Actuarial Sciences"},{"subject_code":"BUS","subject_description":"Business"},{"subject_code":"CAH","subject_description":"Cahuilla"},{"subject_code":"CBNS","subject_description":"Cell Biology and Neuroscience"},{"subject_code":"CEE","subject_description":"Chemical and Environmental Eng"},{"subject_code":"CHE","subject_description":"Chemical Engineering"},{"subject_code":"CHEM","subject_description":"Chemistry"},{"subject_code":"CHFY","subject_description":"CHASS First Yr Experience Prog"},{"subject_code":"CHN","subject_description":"Chinese"},{"subject_code":"CLA","subject_description":"Classical Studies"},{"subject_code":"CMDB","subject_description":"Cell, Molecular, and Develpmnt"},{"subject_code":"CPAC","subject_description":"Comparative Ancient Civilizatn"},{"subject_code":"CPLT","subject_description":"Comparative Literature"},{"subject_code":"CRWT","subject_description":"Creative Writing"},{"subject_code":"CS","subject_description":"Computer Science"},{"subject_code":"CWLR","subject_description":"Low Res-Crwt Wrt&amp;Wrt-Perf Arts"},{"subject_code":"CWPA","subject_description":"Crwt Wrt &amp; Wrt for Perf Arts"},{"subject_code":"DNCE","subject_description":"Dance"},{"subject_code":"ECON","subject_description":"Economics"},{"subject_code":"EDUC","subject_description":"Education"},{"subject_code":"EE","subject_description":"Electrical Engineering"},{"subject_code":"EEOB","subject_description":"Evoltn, Ecolgy, &amp; Orgnsml Bio"},{"subject_code":"ENGL","subject_description":"English"},{"subject_code":"ENGR","subject_description":"Engineering"},{"subject_code":"ENSC","subject_description":"Environmental Sciences"},{"subject_code":"ENTM","subject_description":"Entomology"},{"subject_code":"ENTX","subject_description":"Environmental Toxicology"},{"subject_code":"ENVE","subject_description":"Environmental Engineering"},{"subject_code":"ETST","subject_description":"Ethnic Studies"},{"subject_code":"EUR","subject_description":"European Culture"},{"subject_code":"FIL","subject_description":"Filipino"},{"subject_code":"FREN","subject_description":"French"},{"subject_code":"GBST","subject_description":"Global Studies"},{"subject_code":"GDIV","subject_description":"Graduate Division"},{"subject_code":"GEN","subject_description":"Genetics"},{"subject_code":"GEO","subject_description":"Geosciences"},{"subject_code":"GER","subject_description":"German"},{"subject_code":"GRK","subject_description":"Greek"},{"subject_code":"GSST","subject_description":"Gender and Sexuality Studies"},{"subject_code":"HASS","subject_description":"Humanities, Arts and Soc Sci"},{"subject_code":"HESA","subject_description":"Highlander Early Start Academy"},{"subject_code":"HISA","subject_description":"History of the Americas"},{"subject_code":"HISE","subject_description":"History of Europe"},{"subject_code":"HIST","subject_description":"History"},{"subject_code":"HNPG","subject_description":"Honors"},{"subject_code":"ITAL","subject_description":"Italian"},{"subject_code":"JPN","subject_description":"Japanese"},{"subject_code":"KOR","subject_description":"Korean"},{"subject_code":"LABR","subject_description":"Labor Studies"},{"subject_code":"LATN","subject_description":"Latin"},{"subject_code":"LBST","subject_description":"Liberal Studies Program"},{"subject_code":"LGBS","subject_description":"Lesbian, Gay, Bisexual Studies"},{"subject_code":"LING","subject_description":"Linguistics"},{"subject_code":"LNST","subject_description":"Latin American Studies"},{"subject_code":"LTLG","subject_description":"Literatures &amp; Languages"},{"subject_code":"LWSO","subject_description":"Law &amp; Society"},{"subject_code":"MATH","subject_description":"Mathematics"},{"subject_code":"MCBL","subject_description":"Microbiology"},{"subject_code":"MCS","subject_description":"Media and Cultural Studies"},{"subject_code":"MCSB","subject_description":"Molecular, Cell &amp; Systems Biol"},{"subject_code":"MDCL","subject_description":"School of Medicine"},{"subject_code":"ME","subject_description":"Mechanical Engineering"},{"subject_code":"MEIS","subject_description":"Middle East and Islamic Stds"},{"subject_code":"MGT","subject_description":"Management"},{"subject_code":"MHHS","subject_description":"Medical and Health Humanities"},{"subject_code":"MSE","subject_description":"Materials Sci and Engineering"},{"subject_code":"MUS","subject_description":"Music"},{"subject_code":"NASC","subject_description":"Natural &amp;Agricultural Sciences"},{"subject_code":"NEM","subject_description":"Nematology"},{"subject_code":"NRSC","subject_description":"Neuroscience"},{"subject_code":"PBPL","subject_description":"Public Policy"},{"subject_code":"PCST","subject_description":"Peace and Conflict Studies"},{"subject_code":"PHIL","subject_description":"Philosophy"},{"subject_code":"PHYS","subject_description":"Physics"},{"subject_code":"PLPA","subject_description":"Plant Pathology"},{"subject_code":"PORT","subject_description":"Portuguese"},{"subject_code":"POSC","subject_description":"Political Science"},{"subject_code":"PSYC","subject_description":"Psychology"},{"subject_code":"RLST","subject_description":"Religious Studies"},{"subject_code":"RUSN","subject_description":"Russian Studies"},{"subject_code":"SEAS","subject_description":"Southeast Asian Studies"},{"subject_code":"SFCS","subject_description":"SpecltveFic &amp; Cultures Science"},{"subject_code":"SOC","subject_description":"Sociology"},{"subject_code":"SPN","subject_description":"Spanish"},{"subject_code":"STAT","subject_description":"Statistics"},{"subject_code":"TCMP","subject_description":"Tri-Campus Classic"},{"subject_code":"TFDP","subject_description":"Theater, Film &amp; Digital Prod"},{"subject_code":"URST","subject_description":"Urban Studies"},{"subject_code":"VNM","subject_description":"Vietnamese"}] 
