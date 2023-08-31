import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themes } from './themes.js';
import { useTheme } from '@mui/material/styles';
import NavigationIcon from '@mui/icons-material/Navigation';
import Typography from '@mui/material/Typography';

export default function RoutingButton(props) {
  const theme = themes[useTheme().theme];
  const isMobile = window.innerWidth < 700;
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);

  return (
      <ButtonBase
        sx={{
          flex: 1,
        }}
        onClick={() => {
          window.location.href = props.to;
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Paper variant='outlined'
          sx={{
            bgcolor: 'background.main',
            borderColor: 'accent.main',
            width: '100%',
            height: '100%',
            minWidth: '300px',
            minHeight: '120px',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'secondary.main',
              cursor: 'pointer',
            },
            '@media (max-width: 700px)': {
              minWidth: '100px',
              minHeight: '40px',
            },
          }}
        >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '85%',
          margin: 'auto',
        }}>
          <Typography variant='h6' color={'background.contrastText'}fontSize={isMobile ? ".8rem" : "1rem"} sx={{ padding: '10px' }}>
            {props.header}
          </Typography>
          <Typography variant='body1' color={'background.contrastText'} fontSize={isMobile ? ".8rem" : "1rem" } sx={{ padding: '10px' }}>
            {props.body}
          </Typography>
        </Box>
          <NavigationIcon 
            sx={{
              position: 'absolute',
              top: 'calc(50% - 12px)',
              right: '10px',
              transform: 'translateY(-50%)',
              color: 'accent.main',
              transition: 'visibility 0.5s ease-in-out, transform 0.5s ease-in-o',
              transform: 'scale(1.2) rotate(90deg)',
              visibility: hover ? 'visible' : 'hidden',
            }}
          />
        </Paper>
      </ButtonBase>
  );
}
