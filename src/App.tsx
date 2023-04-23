import React from 'react'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import { CircularProgress, Grid } from '@mui/material'
import Layout from './components/Layout'
import ProjectsPage from './pages/ProjectsPage'
import PeoplePage from './pages/PeoplePage/PeoplePage'
import ReportsPage from './pages/ReportsPage'
import RegistrationPage from './pages/Registration'
import People from './pages/PeoplePage/PeoplePage'

function App() {
	const { store } = React.useContext(Context)

	// const [users, setUsers] = React.useState<IUser[]>([])

	React.useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	// async function getUsers(){
	//     try {
	//         const response = await UserService.fetchUsers()
	//         setUsers(response.data)
	//     }catch (e) {
	//         console.log(e)
	//     }
	// }

	if (store.loading) {
		return (
			<Grid mt={5} container direction='column' alignItems='center'>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		)
	}

	if (!store.isAuth) {
		return (
			<div>
				<Routes>
					<Route path='/' element=<LoginPage /> />
					<Route path='/registration/:link' element=<RegistrationPage /> />
				</Routes>
			</div>
		)
	}

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element=<HomePage /> />
					<Route path='projects' element=<ProjectsPage /> />
					<Route path='people' element=<PeoplePage /> />

					<Route path='reports' element=<ReportsPage /> />
				</Route>
			</Routes>
		</div>
	)
}

export default observer(App)
