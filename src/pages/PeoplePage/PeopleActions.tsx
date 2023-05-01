import { Box, Fab } from '@mui/material'
import React from 'react'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import { green } from '@mui/material/colors'
import { Link } from 'react-router-dom'

interface IPeopleActions {
	params: any
}

const PeopleActions: React.FC<IPeopleActions> = ({ params }) => {
	return (
		<Box sx={{ m: 1, position: 'relative' }}>
			<Link to={`/people/${params.id}`}>
				<Fab
					color='primary'
					sx={{
						width: 40,
						height: 40,
						bgcolor: green[500],
						'&:hover': { bgcolor: green[700] },
					}}
				>
					<ReadMoreIcon />
				</Fab>
			</Link>
		</Box>
	)
}

export default PeopleActions
