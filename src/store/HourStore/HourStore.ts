import { makeAutoObservable } from 'mobx'
import {
	AddHourDto,
	ProjectHours,
} from '../../interfaces/HoursInterface'
import HoursService from '../../services/HoursService'

class HourStore {
	hours: ProjectHours[] = []
	loading: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setLoading(bool: boolean) {
		this.loading = bool
	}

	setHours(hours: ProjectHours[]) {
		this.hours = hours
	}

	async addHour({ value, date, projectId }: AddHourDto) {
		try {
			await HoursService.addHours(projectId, value, date)
		} catch (e: any) {
			console.log(e?.response?.data?.message)
			return e?.response?.data?.message
		}
	}

	async getDeveloperHours({
		id,
		start,
		end,
	}: {
		id?: number
		start?: string
		end?: string
	}) {
		try {
			this.setLoading(true)
			const response = await HoursService.getOneDeveloperHours(id, start, end)
			this.setHours(response.data)
		} catch (e: any) {
			console.log(e?.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async deleteHour(id: number) {
		try {
			await HoursService.deleteHour(id)

			const updatedHours = this.hours
				.map((project) => {
					const updatedHour = {
						...project,
						hours: project.hours.filter((h) => h.id !== id),
					}

					if (updatedHour.hours.length === 0) {
						return null
					}

					return updatedHour
				})
				.filter(Boolean)
			this.setHours(updatedHours as ProjectHours[])
		} catch (e: any) {
			console.log(e?.response?.data?.message)
			return e?.response?.data?.message
		}
	}
}

export default new HourStore()
