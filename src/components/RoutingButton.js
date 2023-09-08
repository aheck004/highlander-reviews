import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import { Paper } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import Typography from '@mui/material/Typography';

export default function RoutingButton(props) {
  const isMobile = window.innerWidth < 700;
  const [hover, setHover] = React.useState(false);

  return (
      <ButtonBase
        sx={{
          flex: 1,
          borderRadius: '10px',
        }}
        onClick={() => {
          if (props.newTab) {
            window.open(props.to, '_blank');
          }
          else {
            window.location.href = props.to;
          }
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
            '@media (max-height: 400px)': {
              minWidth: '25vw',
              minHeight: '20vw',
            }
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
              transform: 'rotate(90deg) translateY(-15%) scale(1.2)',
              color: 'accent.main',
              transition: 'visibility 0.5s ease-in-out, transform 0.5s ease-in-o',
              visibility: hover ? 'visible' : 'hidden',
            }}
          />
        </Paper>
      </ButtonBase>
  );
}
