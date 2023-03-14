import React from "react";
import './Review.css';
import { Container, Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import PopUp from "./global/PopUp";


export default function Review({info, onClose}) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [descrip, setDescrip] = useState('');
  const [popUp, showPopUp] = useState(false)
  const [popUpContent, setPopUpContent] = useState('')

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleRating = (e) => {
    setRating(e.target.value);
  }

  const handleDescrip = (e) => {
    setDescrip(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      setPopUpContent('Please enter your name')
      showPopUp(true)
      return
    }

    const review = {
      name: name,
      rating: Number(rating),
      description: descrip
    }

    fetch(`http://localhost:5000/review?ref=${info.id}`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(review)
    }).then((response) => {
      return response.json()
    }).then(response => {
      if (response.error) {
        setPopUpContent(response.error)
        showPopUp(true)
      } else {
        setPopUpContent('Review submitted!')
        showPopUp(true)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Container className="reviewOverlay" aria-modal={true} fluid>
        <Card className="reviewCard">
        <div className="reviewHeader">
          <Button onClick={onClose} className="reviewClose" variant="danger">Close</Button>
          <h2>Tell us your thoughts</h2>
        </div>
          <Form name='reviewForm' onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" onChange={handleName}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select" onChange={handleRating}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Review</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleDescrip}/>
            </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>
        </Card>
        <PopUp trigger={popUp} setTrigger={showPopUp} onClose={() => onClose()}>
          {popUpContent}
        </PopUp>
    </Container>
  )
};

