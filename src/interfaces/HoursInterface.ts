export interface Hour {
	id: number
	projectId: number
	developerId: number
	value: number
	date: string
}

export interface ProjectHours {
	id: number
	name: string
	hours: {
		id: number
		value: number
		date: string
	}[]
}

export interface DeveloperHours {
	id: number
	fullName: string
	projects: ProjectHours[]
}

export interface AddHourDto {
	value: number
	date: string
	projectId: number
}
