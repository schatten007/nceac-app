import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'

function CheckForm() {
  return (
    <Container>
        <Sidebar />
        <h1>CheckForm</h1>
    </Container>
  )
}

export default CheckForm