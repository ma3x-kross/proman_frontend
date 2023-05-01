import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { UpdateUserDto, User } from '../interfaces/UsersInterfaces'

export default class UserService {
	static async invite(
		email: string,

		role: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/users/invite', {
			email,
			role,
		})
	}

	static async fetchUsers(): Promise<AxiosResponse<User[]>> {
		return $api.get<User[]>('/users')
	}

	static async fetchOneUser(id: number): Promise<AxiosResponse<User>> {
		return $api.get<User>(`/users/${id}`)
	}

	static async fetchSelf(): Promise<AxiosResponse<User>> {
		return $api.get<User>(`/users/get/self`)
	}

	static async UpdateSelf({
		email,
		password,
		fullName,
		phone,
		telegramUsername,
	}: UpdateUserDto): Promise<AxiosResponse<User>> {
		return $api.put<User>('/users/update/self', {
			email,
			password,
			fullName,
			phone,
			telegramUsername,
		})
	}

	static async delete(id?: number) {
		if (id) $api.delete(`users/${id}`)
		else $api.delete('users/delete/self')
	}

	static async addRole(value: string, userId: number) {
		$api.post('users/add-role', { value, userId })
	}
}
