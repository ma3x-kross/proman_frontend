import { Project } from "./ProjectsInterfaces"

export interface User {
	id: number
	email: string
	roles: Roles[]
	profile: Profile
	projects: Project[]
	developersProjects: Project[]
	developerRates?: Rate[]
}

export interface Rate {
	value: number
	date: string
}

interface Roles {
	value: string
}

export interface Profile {
	fullName: string
	phone: string
	telegramUsername: string
}

export interface RegisterDto {
	fullName: string
	password: string
	phone: string
	telegramUsername: string
}

export interface UpdateUserDto extends RegisterDto {
	email: string
}
