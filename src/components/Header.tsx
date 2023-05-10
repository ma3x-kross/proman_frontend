import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Context } from '..'

interface IPages {
	projects?: string
	people?: string
	reports?: string
}

// let pages = {} as IPages

// if (localStorage.getItem('roles')?.includes('ADMIN')) {
// 	pages = { projects: 'Проекты', people: 'Персонал', reports: 'Отчетность' }
// }

// if (localStorage.getItem('roles')?.includes('MANAGER')) {
// 	pages = {
// 		projects: 'Проекты',
// 		people: 'Персонал',
// 	}
// }
const settings = ['Личный кабинет', 'Выход']

function Header() {
	const [pages, setPages] = React.useState<IPages>({})
	const navigate = useNavigate()

	const { store } = React.useContext(Context)

	React.useEffect(() => {
		if (localStorage.getItem('roles')?.includes('ADMIN')) {
			setPages({
				projects: 'Проекты',
				people: 'Персонал',
				reports: 'Отчетность',
			})
		} else if (localStorage.getItem('roles')?.includes('MANAGER')) {
			setPages({
				projects: 'Проекты',
				people: 'Персонал',
			})
		}
	}, [])

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = async (event: React.MouseEvent<HTMLElement>) => {
		const target = event.target as HTMLElement
		if (target !== null) {
			const text = target.innerText
			if (text === settings[0]) navigate('/profile')
			if (text === settings[1]) {
				await store.logout()
				navigate('/')
			}
		}
		setAnchorElUser(null)
	}

	let activeStyle = {
		textDecoration: 'none',
		color: '#fff',
		textShadow: '0 0 5px #fff, 0 0 50px #6a83fb',
	}

	return (
		<AppBar position='static'>
			<Container maxWidth='lg'>
				<Toolbar disableGutters>
					<InsertChartIcon
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
					/>

					<Typography
						variant='h6'
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
							PROMAN
						</Link>
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{Object.entries(pages).map(([key, value]) => (
								<MenuItem key={key} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>
										<NavLink
											to={key}
											style={({ isActive }) =>
												isActive
													? activeStyle
													: { textDecoration: 'none', color: 'inherit' }
											}
										>
											{value}
										</NavLink>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<InsertChartIcon
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
					/>
					<Typography
						variant='h5'
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
							PROMAN
						</Link>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{Object.entries(pages).map(([key, value]) => (
							<Button
								key={key}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								<NavLink
									to={key}
									style={({ isActive }) =>
										isActive
											? activeStyle
											: { textDecoration: 'none', color: 'inherit' }
									}
								>
									{value}
								</NavLink>
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Открыть настройки'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Header
