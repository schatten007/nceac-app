import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'

function Dashboard() {
  return (
    <Container>
        <Sidebar />
        <h1>Dashboard</h1>
    </Container>
  )
}

export default Dashboard