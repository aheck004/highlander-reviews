import React, { useState, useEffect } from 'react';
import Review from './review'
import DifficultyGraph from './DifficultyGraph';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateReviewModal from './CreateReview'

function ClassPage() {
  const [reviews, setReviews] = useState([])
  const [graphData, setGraphData] = useState([0,0,0,0,0])
  const { course } = useParams();  //gets the field :course from /course/:course

  useEffect(() => {
    async function getReviews() {//request reviews for this course
      await axios.get(process.env.REACT_APP_NODE_SERVER+`/course/${course}`)
      .then(response => {
        setReviews(response.data)//updates useState reviews to redraw the DOM
        const data = [0,0,0,0,0]
        console.log(response.data)
        response.data.map((review)=>{
          data[Math.ceil(review.difficulty/2)-1]++
        })
        setGraphData(data.reverse())
        })
      .catch(error => console.error(error));
    }
    getReviews()
  }, [])

  return (
    <div className='class-page-root'>
      <CreateReviewModal></CreateReviewModal>
      <div className='review-column'>
        {reviews.map((review)=>{ //for every review return a <Review/> component
          return <Review comment={review.additional_comments} diff={review.difficulty} date={review.date}/>
        })}
      </div>
      <DifficultyGraph review_data={graphData}/>
    </div>
  );
}

export default ClassPage;
