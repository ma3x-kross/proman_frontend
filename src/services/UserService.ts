import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { UpdateUserDto, User } from '../interfaces/UsersInterfaces'

export default class UserService {
	static async invite(
		email: string,
		role: string,
		rate: number,
	): Promise<AxiosResponse<AuthResponse>> {
		console.log(rate, typeof rate)
		return $api.post<AuthResponse>('/users/invite', {
			email,
			role,
			rate,
		})
	}

	static async fetchUsers(role?: string): Promise<AxiosResponse<User[]>> {
		return $api.get<User[]>(`/users${role ? `?role=${role}` : ''}`)
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

	static async addRate(developerId: number, value: number, date: string) {
		return $api.post('payroll/rate', { value, developerId, date })
	}
}
