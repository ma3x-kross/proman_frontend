import {IUser} from '../models/IUser';
import {makeAutoObservable} from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import {AuthResponse} from '../models/response/AuthResponse';
import {API_URL} from '../http';

export default class Store {
    user = {} as IUser
    isAuth = false
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean){
        this.isAuth = bool
    }

    setUser(user: IUser){
        this.user = user
    }

    setLoading(bool: boolean){
        this.loading = bool
    }

    async login(email:string, password:string){
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e: any){
            console.log(e.response?.data?.message)
        }
    }

    async invite(firstName: string, secondName: string, surname: string, email: string, phone: number, tgLogin: string, roles: string[]){
        try {
            const response = await AuthService.invite(firstName, secondName, surname, email, phone, tgLogin, roles)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e: any){
            console.log(e.response?.data?.message)
        }
    }

    async logout(){
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        }catch (e: any){
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth(){
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
                withCredentials: true
            })
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e: any){
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

}