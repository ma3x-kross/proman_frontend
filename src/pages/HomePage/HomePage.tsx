import { CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { Context } from '../..'
import DevelopersHomePage from '../DevelopersHomePage/DevelopersHomePage'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
	const { store } = React.useContext(Context)

	if (store.loading)
		return (
			<Grid mt={5} container direction='column' alignItems='center'>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		)

	if (store.roles.includes('ADMIN') || store.roles.includes('MANAGER'))
		return <Navigate to='/projects' />
	return <DevelopersHomePage />
}

export default HomePage
