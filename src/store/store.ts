import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../http'
import UserService from '../services/UserService'
import { RegisterDto, User } from '../interfaces/UsersInterfaces'

export default class Store {
	user = {} as User
	isAuth = false
	loading = false
	roles = localStorage.getItem('roles') || ''

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setUser(user: User) {
		this.user = user
	}

	setLoading(bool: boolean) {
		this.loading = bool
	}

	setRoles(roles: string) {
		this.roles = roles
	}

	// Auth
	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password)
			const roles = JSON.stringify(response.data.user.roles)
			localStorage.setItem('token', response.data.accessToken)
			localStorage.setItem('roles', roles)
			this.setAuth(true)
			this.setUser(response.data.user)
			this.setRoles(roles)
			console.log(response.data.user)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout()
			localStorage.removeItem('token')
			localStorage.removeItem('roles')
			this.setAuth(false)
			this.setUser({} as User)
			this.setRoles('')
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async checkAuth() {
		this.setLoading(true)
		try {
			const response = await axios.get<AuthResponse>(
				`${API_URL}/auth/refresh`,
				{
					withCredentials: true,
				},
			)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	// Users
	async invite(email: string, role: string) {
		try {
			const response = await UserService.invite(email, role)
			console.log(response)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async register(dto: RegisterDto, link: string) {
		try {
			const response = await AuthService.register(dto, link)
			console.log(response)
			const roles = JSON.stringify(response.data.user.roles)
			localStorage.setItem('token', response.data.accessToken)
			localStorage.setItem('roles', roles)
			this.setAuth(true)
			this.setUser(response.data.user)
			this.setRoles(roles)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}
}
