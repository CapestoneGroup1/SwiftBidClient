import React from 'react'
import { Stack } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Footer() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className='d-flex justify-content-center'>
         &copy; SwiftBid 2024
      </Container>
    </Navbar>
  )
}
