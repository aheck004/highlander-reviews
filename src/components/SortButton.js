import SortIcon from '@mui/icons-material/Sort';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import TodayIcon from '@mui/icons-material/Today';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Menu, Button, MenuItem } from '@mui/material';
import { useState } from 'react';


function SortButton({ reviews, setReviews }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortReviews = (sortType) => {
    if (sortType === "date") {
      const sortedReviews = [...reviews].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setReviews(sortedReviews);
    } else if (sortType === "highestdifficulty") {
      const sortedReviews = [...reviews].sort((a, b) => {
        return b.difficulty - a.difficulty;
      });
      setReviews(sortedReviews);  
    } else if (sortType === "lowestdifficulty") { 
      const sortedReviews = [...reviews].sort((a, b) => {
        return a.difficulty - b.difficulty;
      });
      setReviews(sortedReviews);
    } else if (sortType === "mosthelpful") {
      const sortedReviews = [...reviews].sort((a, b) => {
        return b.liked - a.liked;
      });
      setReviews(sortedReviews);
    } else if (sortType === "leasthelpful") {
      const sortedReviews = [...reviews].sort((a, b) => { 
        return a.disliked - b.disliked;
      });
      setReviews(sortedReviews);
    }
    handleClose();
  }

  return (
    <div>
      <Button
        variant='contained'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SortIcon/>
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{
          sortReviews("date");
        }}>
          <TodayIcon/>
          Date</MenuItem>
        <MenuItem onClick={()=>{
          sortReviews("highestdifficulty");
        }}>
          <StarIcon/>
          Highest Difficulty</MenuItem>
        <MenuItem onClick={()=>{
          sortReviews("lowestdifficulty");
        }}>
          <StarHalfIcon/>
          Lowest Difficulty</MenuItem>
        <MenuItem onClick={()=>{
          sortReviews("mosthelpful");
        }}>
          <ThumbUpOffAltIcon/>
          Most Helpful</MenuItem>
        <MenuItem onClick={()=>{
          sortReviews("leasthelpful");
        }}>
          <ThumbDownOffAltIcon/>
          Least Helpful</MenuItem>
      </Menu>
    </div>
  );
}

export default SortButton