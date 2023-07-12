import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material'
import review from './review'
import { Axios } from 'axios';

function ClassPage({Course}) {
  const [course, setCourse] = useState(null)
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    async function getReviews() {
      await Axios.get(process.env.REACT_APP_NODE_SERVER+`/course/${course}`)
      .then(response => {
        setReviews(response)
      })
      .catch(error => console.error(error));
    }
    getReviews()
  }, [course])

  return (
    <div className='class-page-root'>
      {reviews.map((review)=>{
        <div/>
      })}
    </div>
  );
}

export default ClassPage;
