import React, { useState, useEffect } from 'react';
import Review from './review'
import axios from 'axios';

function ClassPage({Course}) {
  const [course, setCourse] = useState("CS141") //TODO: populate page with reviews
  const [reviews, setReviews] = useState([])

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
