import React from 'react';
import '../profile.scss';
import {Card,Row,Form} from 'react-bootstrap';

const Ch_pass = () => {
  return (
    <div>
    <Card style={{ width: '48rem' }}>
    <Card.Body>
   <Row>
   <Form.Label htmlFor="inputPassword5" className='lbl'>Old Password</Form.Label>
      <Form.Control
      className='mb-3'
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
   </Row>
   <Row>
   <Form.Label className='lbl' htmlFor="inputPassword5">New Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
      
   </Row>
   <Row>
      <Form.Label className='lbl' htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
     
      </Row>
      <Row>
      <button  className="save-btn mt-3" style={{width:"100%"}}>Save Changes</button>
      </Row>
    </Card.Body>
  </Card>
    </div>
  )
}

export default Ch_pass
