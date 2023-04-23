import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Container, Divider } from '@mui/material'
import Footer from './Footer'

function Layout() {
	return (
		<>
			<Header />
			<Container maxWidth='lg' sx={{ minHeight: '75vh' }}>
				<Outlet />
			</Container>

			<Divider sx={{ mt: '30px' }} />

			{/* <Footer /> */}
		</>
	)
}

export default Layout
