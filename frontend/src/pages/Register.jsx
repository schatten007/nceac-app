import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'

function Register() {
  return (
    <Container>
      <Sidebar />
      <h1>Register</h1>
    </Container>
  )
}

export default Register