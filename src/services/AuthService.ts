import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { RegisterDto } from '../interfaces/UsersInterfaces'

export default class AuthService {
	static async login(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/login', { email, password })
	}

	static async register(
		dto: RegisterDto,
		link: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>(`/auth/register/${link}`, dto)
	}

	static async logout(): Promise<void> {
		return $api.get('/auth/logout')
	}
}
