import $api from '../http';
import {AxiosResponse} from 'axios'
import {AuthResponse} from '../models/response/AuthResponse';


export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async invite(firstName: string, secondName: string, surname: string, email: string, phone: number, tgLogin: string, roles: string[] ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/invite', {firstName, secondName, surname, email, phone, tgLogin, roles})
    }

    static async logout(): Promise<void> {
        return $api.get('/auth/logout')
    }
}
