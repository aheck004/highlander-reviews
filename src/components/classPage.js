import React, { useState, useEffect } from 'react';
import Review from './review'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClassPage() {
  const [reviews, setReviews] = useState([])
  const { course } = useParams();

  useEffect(() => {
    async function getReviews() {
      await axios.get(process.env.REACT_APP_NODE_SERVER+`/course/${course}`)
      .then(response => {
        setReviews(response.data)
      })
      .catch(error => console.error(error));
    }
    getReviews()
  }, [course])

  return (
    <div className='class-page-root'>
      <div className='review-column'>
        {reviews.map((review)=>{
          return <Review comment={review.additional_comments} diff={review.difficulty} date={review.date}/>
        })}
      </div>
    </div>
  );
}

export default ClassPage;
