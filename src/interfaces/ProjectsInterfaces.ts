import { User } from './UsersInterfaces'

export interface Project {
	id: number
	name: string
	status: string
	deadline: string
	plannedHours: number
	workedHours: number
	rate: number
	salary: number
	cost: number
	profit: number
	managerId?: number | null
	manager?: User
	developers: User[]
	relatedProjects: { id: number; name: string }[]
}

export const PROJECT_STATUSES = [
	'Переговоры',
	'Отрисовка дизайна',
	'Утверждение дизайна',
	'Старт программирования',
	'Горит',
	'Ждем ОС клиента',
	'Пишем инструкцию',
	'Внутреннее тестирование',
	'Вносим правки',
	'Реклама',
	'Техподдержка',
	'Закрыт',
	'Отдать в разработку',
	'Предложить доп. продажу',
	'Ждем оплату',
	'Обсудить проект',
	'Приостановлен',
] as const

type ProjectStatus = (typeof PROJECT_STATUSES)[number]

export interface CreateProjectDto {
	name: string

	status: ProjectStatus

	deadline: string

	plannedHours: number

	rate: number

	managerId: number

	developersIds: number[]
}

export interface UpdateProjectDto {
	name: string

	status: ProjectStatus

	deadline: string

	plannedHours: number

	rate: number
}
