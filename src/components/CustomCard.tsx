import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Icon,
	Paper,
	Typography,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function CustomCard({
	link,
	title,
	IconComponent,
}: {
	link: string
	title: string
	IconComponent: React.ElementType
}) {
	return (
		<Paper
			elevation={3}
			sx={{
				borderRadius: '10px',
			}}
		>
			<Card
				sx={{
					height: 350,
					width: 270,
					position: 'relative',
					borderRadius: '10px',
				}}
			>
				<CardContent
					sx={{
						background: 'linear-gradient(#714BDD, #462E88)',
						height: '230px',
						position: 'relative',
					}}
				>
					<Box
						sx={{
							marginTop: '55px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Icon fontSize='large' color='info'>
							<IconComponent fontSize='large' />
						</Icon>
					</Box>
					<Box
						sx={{
							display: 'flex',
							// alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Typography mt={3} variant='h4' component='h2' color='#fff'>
							{title}
						</Typography>
					</Box>
				</CardContent>
				<CardActions
					sx={{
						position: 'absolute',
						bottom: '20px',
						left: '58px',
					}}
				>
					<Button size='large' variant='contained'>
						<Link
							to={link}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							Открыть
						</Link>
					</Button>
				</CardActions>
			</Card>
		</Paper>
	)
}

export default CustomCard
