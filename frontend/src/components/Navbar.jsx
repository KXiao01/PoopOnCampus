import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";

export default function NavBar() {

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Shits on Campus 💩</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text fluid="md">
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}
