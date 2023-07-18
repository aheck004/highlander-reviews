import React, { useState, useEffect } from 'react';
import { Paper, Divider, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import GradeIcon from '@mui/icons-material/Grade';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import './classPage.css'

function Review({comment, diff, date}) {
  
  
  return (
    <Paper elevation={4} className='review'>
      <span className='review-header'>
        <div className='review-difficulty'>
          <Typography>Difficulty: </Typography> 
          {[...Array(Math.floor(diff/2))].map((_, count)=>{
            return <GradeIcon key={count}/>
          })}
          {diff%2==0 ? <></>:<StarHalfIcon/>}
        </div>
        <div className='review-date'>
          {date}
        </div>
      </span>
      <Divider />
      <div className='review-comment'>
        {comment}
      </div>
      <div className="control-bar">
        <div className="helpful">
          <p>
            <b>Helpful?</b>
          </p>
          <ThumbUpIcon sx={{color:'green', marginRight:'10px'}}/>
          <ThumbDownIcon sx={{color:'red'}}/>
        </div>
      </div>
    </Paper>
  );
}

export default Review;
