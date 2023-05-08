import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import HourStore from '../../store/HourStore/HourStore'

interface ICellHourProps {
	params: any
}

const CellHour: React.FC<ICellHourProps> = ({ params }) => {

	const value = params.value.split(' ')[0]
	const id = params.value.split(' ')[1]

	const handleClick = async()=>{
		console.log(id)
		await HourStore.deleteHour(parseInt(id))
	}

	return (
		<Box
			sx={{
				position: 'relative',
				'&:hover .clear-icon': {
					opacity: 1,
				},
				'&:hover .cell-value': {
					opacity: 0,
				},
			}}
		>
			<Typography className='cell-value' sx={{ transition: 'opacity 0.2s' }}>
				{value}
			</Typography>

			<IconButton
				onClick={handleClick}
				size='small'
				color='error'
				className='clear-icon'
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					opacity: 0,
					transition: 'opacity 0.2s',
				}}
			>
				<ClearIcon />
			</IconButton>
		</Box>
	)
}

export default CellHour
