import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'

function Login() {
  return (
    <Container>
      <Sidebar />
      <h1>Login</h1>
    </Container>
  )
}

export default Login