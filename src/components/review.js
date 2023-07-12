import React, { useState, useEffect } from 'react';
import { Paper, Divider } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import GradeIcon from '@mui/icons-material/Grade';
import './classPage.css'

function Review({comment, diff, date}) {
  

  return (
    <Paper elevation={4} className='review'>
      <span className='review-header'>
        <div className='review-difficulty'>
          Difficulty: 
          {[...Array(Number(diff))].fill(null).map((_, count)=>{
            return <GradeIcon key={count} sx={{ fontSize:'medium'}}/>
          })}
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
