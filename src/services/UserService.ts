import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { User } from '../interfaces/UsersInterfaces'

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
}
