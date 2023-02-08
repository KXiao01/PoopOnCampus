import React from 'react'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import './Panel.css';
import Button from 'react-bootstrap/Button'
import Review from './Review';
import { useState, useEffect } from 'react';



export default function Panel({info, onClose, setIsReviewOpen}) {
  // get reviews from info.reviews

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/reviews?ref=${info.id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
      <Card bg='light' className='panel'>
        <Button variant='danger' onClick={onClose}>close</Button>
        <Card.Img src={info.img} style={{ width: '100%' }}></Card.Img>            
        <Card.Title>{info.title}</Card.Title>
        <div>Rating: {info.avgRating}/5</div>
              <h3>Reviews</h3>
              <Button variant="primary" onClick={() => setIsReviewOpen(true)}>Write a review</Button>
              <div className='reviews'>
                {reviews.map((review) => (
                  <div key={review.id} className='review'>
                    <h4>{review.name}</h4>
                    <div>{review.rating}/5</div>
                    <div>{review.description}</div>
                  </div>
                ))}
            </div>

      </Card>

  )
}