import React, { useState, useEffect } from 'react';
import Review from './review'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClassPage() {
  const [reviews, setReviews] = useState([])
  const { course } = useParams();  //gets the field :course from /course/:course

  useEffect(() => {
    async function getReviews() {//request reviews for this course
      await axios.get(process.env.REACT_APP_NODE_SERVER+`/course/${course}`)
      .then(response => {
        setReviews(response.data)//updates useState reviews to redraw the DOM
      })
      .catch(error => console.error(error));
    }
    getReviews()
  }, [])

  return (
    <div className='class-page-root'>
      <div className='review-column'>
        {reviews.map((review)=>{ //for every review return a <Review/> component
          return <Review comment={review.additional_comments} diff={review.difficulty} date={review.date}/>
        })}
      </div>
    </div>
  );
}

export default ClassPage;
