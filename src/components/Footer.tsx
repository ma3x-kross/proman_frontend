import React, { FC, ReactElement } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

export const Footer: FC = (): ReactElement => {
	return (
		<Box
			sx={{
				width: '100%',
				height: 'auto',
				// backgroundColor: 'secondary.dark',
				paddingTop: '1rem',
				paddingBottom: '1rem',
			}}
		>
			<Container maxWidth='lg'>
				<Grid container direction='column' alignItems='center'>
					<Grid item xs={12}>
						<Typography color='black' variant='h5'>
							Project management
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography color='black'>
							{`${new Date().getFullYear()}`}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default Footer
