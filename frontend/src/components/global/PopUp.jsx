import React from 'react';
import PropTypes from 'prop-types';
import './PopUp.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// Function to generate PopUp
function PopUp (props) {
  return (props.trigger)
    ? (
    <Container className="popup-container" aria-modal={true}>
      <div className='popup'>
        <div className='popup-inner'>
          <Button variant={'danger'} className="close-btn" onClick={() => {props.setTrigger(false); props.onClose()}}>Close</Button>
          {props.children}
        </div>
      </div>
    </Container>
      )
    : '';
}

PopUp.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.bool.isRequired,
  setTrigger: PropTypes.func,
  onClose: PropTypes.func
}

export default PopUp
