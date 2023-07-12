import React, { useState, useEffect } from 'react';
import { Paper, Divider } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import './classPage.css'

function Review({comment, diff, date}) {
  

  return (
    <Paper elevation='4' className='review'>
      <span>
        <div>
          Difficulty: {diff}
        </div>
        <div>
          {date}
        </div>
      </span>
      <Divider />
      <div>
        {comment}
      </div>
      <div class="control-bar">
        <div class="controls" data-redirect-url="/accounts/login/?next=/professors/mark-burgin/com-sci-181/">
          <div class="helpful">
            <p>
              <b>Helpful?</b>
            </p>
            <ThumbUpIcon/>
            <ThumbDownIcon/>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default Review;
