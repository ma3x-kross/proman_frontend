import {User } from "../../interfaces/UsersInterfaces"

export interface AuthResponse{
	accessToken: string,
	user: User
}