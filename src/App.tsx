import React from 'react'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import LoginPage from './pages/auth/LoginPage/LoginPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import { CircularProgress, Grid } from '@mui/material'
import Layout from './components/Layout'
import ProjectsPage from './pages/ProjectPage/ProjectsPage'
import PeoplePage from './pages/PeoplePage/PeoplePage'
import ReportsPage from './pages/ReportPage/ReportsPage'
import RegistrationPage from './pages/auth/RegisterPage/RegistrationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import PeopleInfoPage from './pages/PeopleInfoPage/PeopleInfoPage'
import ProjectInfoPage from './pages/ProjectInfoPage/ProjectInfoPage'

function App() {
	const { store } = React.useContext(Context)

	const allowAdminAndManager =
		localStorage.getItem('roles')?.includes('ADMIN') ||
		localStorage.getItem('roles')?.includes('MANAGER')
	const allowOnlyAdmin = localStorage.getItem('roles')?.includes('ADMIN')

	// const [users, setUsers] = React.useState<IUser[]>([])

	React.useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	if (store.loading) {
		return (
			<Grid mt={5} container direction='column' alignItems='center'>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		)
	}

	// if (!store.isAuth) {
	// 	return (
	// 		<div>
	// 			<Routes>
	// 				<Route path='/' element=<LoginPage /> />
	// 				<Route path='/registration/:link' element=<RegistrationPage /> />
	// 			</Routes>
	// 		</div>
	// 	)
	// }

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element=<HomePage /> />
					<Route
						path='projects'
						element={
							allowAdminAndManager ? (
								<ProjectsPage />
							) : (
								<Navigate to='/' replace />
							)
						}
					/>
					<Route path='projects/:id' element=<ProjectInfoPage/>/>
					<Route
						path='people'
						element={
							true ? (
								<PeoplePage />
							) : (
								<Navigate to='/' replace />
							)
						}
					/>
					<Route
						path='people/:id'
						element={
							allowAdminAndManager ? (
								<PeopleInfoPage />
							) : (
								<Navigate to='/' replace />
							)
						}
					/>
					<Route
						path='reports'
						element={
							allowOnlyAdmin ? <ReportsPage /> : <Navigate to='/' replace />
						}
					/>
					<Route path='profile' element=<ProfilePage /> />
				</Route>
			</Routes>
		</div>
	)
}

export default observer(App)
