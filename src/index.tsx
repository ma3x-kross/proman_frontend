import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Store from './store/store'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {  CssBaseline } from '@mui/material'

import { ruRU } from '@mui/material/locale'

const theme = createTheme(
	{
		palette: {
			primary: {
				light: '#714BDD',
				main: '#5B3DB3',
				dark: '#462E88',
				contrastText: '#fff',
			},
			info: {
				main: '#fff',
			},
			background: {
				default: '#fbfbfb',
			},
		},
	},
	ruRU,
)

interface State {
	store: Store
}

const store = new Store()

export const Context = createContext<State>({
	store,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<Context.Provider value={{ store }}>
				<CssBaseline />
				<App />
			</Context.Provider>
		</BrowserRouter>
	</ThemeProvider>,
)
