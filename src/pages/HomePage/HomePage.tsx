import { CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { Context } from '../..'
import GridHomePage from './GridHomePage'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'

const icons = [FormatListBulletedIcon, RecentActorsIcon, CurrencyRubleIcon]

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

	if (store.roles.includes('ADMIN'))
		return (
			<GridHomePage
				pages={{
					projects: 'Проекты',
					people: 'Персонал',
					reports: 'Отчетность',
				}}
				icons={icons}
			/>
		)

	if (store.roles.includes('MANAGER'))
		return (
			<GridHomePage
				pages={{
					projects: 'Проекты',
					people: 'Персонал',
				}}
				icons={icons}
			/>
		)

	return <div></div>
}

export default HomePage
