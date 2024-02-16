import React from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function Footer() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" sticky='bottom'>
      <Container className='d-flex justify-content-center'>
         &copy; SwiftBid 2024
      </Container>
    </Navbar>
  )
}
