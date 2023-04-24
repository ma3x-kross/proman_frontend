import React from 'react'
import { Container, Grid, Paper } from '@mui/material'

interface IFormContainerProps {
	Component: React.ReactNode
}

const FormContainer: React.FC<IFormContainerProps> = ({ Component }) => {
	return (
		<Container maxWidth='xs'>
			<Grid
				container
				spacing={2}
				direction='column'
				justifyContent='center'
				sx={{ minHeight: '100vh' }}
			>
				<Paper elevation={5} sx={{ padding: 5 }}>
					{Component}
				</Paper>
			</Grid>
		</Container>
	)
}
export default FormContainer
