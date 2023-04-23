

export interface User {
	id: number
	email: string
	roles: Roles[]
	profile: Profile
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


