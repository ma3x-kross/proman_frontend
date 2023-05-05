import { makeAutoObservable } from 'mobx'
import UserService from '../../services/UserService'
import { UpdateUserDto, User } from '../../interfaces/UsersInterfaces'
import { Project } from '../../interfaces/ProjectsInterfaces'

export interface IUsers {
	id: number
	email: string
	fullName: string
	role: string
	phone: string
	telegramUsername: string
}

class UsersStore {
	user: IUsers = {} as IUsers
	users: IUsers[] = []
	loading: boolean = false
	userProjects: Project[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setUsers(users: User[]) {
		this.users = users.map((user) => ({
			id: user.id,
			email: user.email,
			fullName: user.profile?.fullName,
			role: user.roles.some((role) => role.value === 'ADMIN')
				? 'администратор'
				: user.roles.some((role) => role.value === 'MANAGER')
				? 'менеджер'
				: 'разработчик',

			phone: user.profile?.phone,
			telegramUsername: user.profile?.telegramUsername,
		}))
	}

	setMyProjects(projects: Project[]) {
		this.userProjects = projects
	}

	setUser(user: User) {
		this.user = {
			id: user.id,
			email: user.email,
			fullName: user.profile?.fullName,
			role: user.roles.some((role) => role.value === 'ADMIN')
				? 'администратор'
				: user.roles.some((role) => role.value === 'MANAGER')
				? 'менеджер'
				: 'разработчик',

			phone: user.profile?.phone,
			telegramUsername: user.profile?.telegramUsername,
		}
		this.user.role === 'разработчик'
			? (this.userProjects = user.developersProjects)
			: (this.userProjects = user.projects)
	}

	setLoading(bool: boolean) {
		this.loading = bool
	}

	async getUsers(role?: string) {
		try {
			this.setLoading(true)
			const response = await UserService.fetchUsers(role)
			this.setUsers(response.data)
			console.log(response)
		} catch (e) {
			console.log(e)
		} finally {
			this.setLoading(false)
		}
	}

	async getOneUser(id?: number) {
		try {
			this.setLoading(true)
			let response
			if (id) response = await UserService.fetchOneUser(id)
			else response = await UserService.fetchSelf()
			this.setUser(response.data)
			console.log(response.data)
		} catch (e) {
			console.log(e)
		} finally {
			this.setLoading(false)
		}
	}

	async updateSelf(dto: UpdateUserDto) {
		try {
			this.setLoading(true)
			const response = await UserService.UpdateSelf(dto)
			this.setUser(response.data)
		} catch (e: any) {
			console.log(e)
			return e.response?.data?.message
		} finally {
			this.setLoading(false)
		}
	}

	async delete(id?: number) {
		try {
			console.log(id)
			if (id) await UserService.delete(id)
			else {
				await UserService.delete()
				localStorage.removeItem('token')
				localStorage.removeItem('roles')
				this.setUser({} as User)
			}
		} catch (e) {
			console.log(e)
		}
	}

	async addRole(value: string, userId: number) {
		try {
			await UserService.addRole(value, userId)
			return true
		} catch (e) {
			console.log(e)
			return false
		}
	}
}

export default new UsersStore()
