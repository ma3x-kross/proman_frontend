import { AxiosResponse } from 'axios'
import $api from '../http'
import {
	ProjectHours,
	Hour,
	DeveloperHours,
} from '../interfaces/HoursInterface'

export default class HoursService {
	static async addHours(
		projectId: number,
		value: number,
		date: string,
	): Promise<AxiosResponse<Hour>> {
		return $api.post<Hour>('hours', { projectId, value, date })
	}

	static async getOneDeveloperHours(
		id?: number,
		start?: string,
		end?: string,
	): Promise<AxiosResponse<ProjectHours[]>> {
		if (!id) {
			return $api.get<ProjectHours[]>(
				`hours/my-hours?start=${
					start && end ? `?start=${start}&end=${end}` : ''
				}`,
			)
		}
		return $api.get<ProjectHours[]>(
			`hours/developer/${id}${
				start && end ? `?start=${start}&end=${end}` : ''
			}`,
		)
	}

	static async deleteHour(id: number) {
		$api.delete(`hours/${id}`)
	}

	static async getAllHours(
		start?: string,
		end?: string,
	): Promise<AxiosResponse<DeveloperHours[]>> {
		return $api.get<DeveloperHours[]>(
			`hours/${start && end ? `?start=${start}&end=${end}` : ''}`,
		)
	}
}
