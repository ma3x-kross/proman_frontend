import { makeAutoObservable } from 'mobx'
import UserService from '../../services/UserService'
import { User } from '../../interfaces/UsersInterfaces'

interface IUsers {
	id: number
	email: string
	fullName?: string
	role: string | boolean
	phone?: string
	telegramUsername: string
}

class UsersStore {
	users: IUsers[] = []
	loading: boolean = false

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

	setLoading(bool: boolean) {
		this.loading = bool
	}

	async getUsers() {
		try {
			this.setLoading(true)
			const response = await UserService.fetchUsers()
			this.setUsers(response.data)
		} catch (e) {
			console.log(e)
		} finally {
			this.setLoading(false)
		}
	}
}

export default new UsersStore()
