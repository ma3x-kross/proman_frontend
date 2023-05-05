import $api from '../http'
import { AxiosResponse } from 'axios'
import { CreateProjectDto, Project } from '../interfaces/ProjectsInterfaces'

export default class ProjectService {
	static async createProject(
		dto: CreateProjectDto,
	): Promise<AxiosResponse<Project>> {
		return $api.post<Project>('/projects', dto)
	}

	static async fetchProjects(): Promise<AxiosResponse<Project[]>> {
		return $api.get<Project[]>('/projects')
	}

	static async fetchOneProject(id: number): Promise<AxiosResponse<Project>> {
		return $api.get<Project>(`/projects/${id}`)
	}

	static async updateProject(
		id: number,
		dto: Project,
	): Promise<AxiosResponse<Project>> {
		return $api.put<Project>(`projects/${id}`, dto)
	}

	static async deleteProject(id: number) {
		return $api.delete(`projects/${id}`)
	}

	static async addDeveloperToProject(
		developerId: number,
		projectId: number,
	): Promise<AxiosResponse<Project>> {
		return $api.post<Project>(`projects/developer`, { developerId, projectId })
	}

	static async deleteDeveloperFromProject(userId: number, projectId: number) {
		return $api.delete(
			`projects/developer?developer=${userId}&project=${projectId}`,
		)
	}

	static async addSubproject(
		sourceProjectId: number,
		targetProjectId: number,
	): Promise<AxiosResponse<Project>> {
		return $api.post<Project>(`projects/related-project`, {
			sourceProjectId,
			targetProjectId,
		})
	}

	static async deleteSubproject(
		sourceProjectId: number,
		targetProjectId: number,
	): Promise<AxiosResponse<Project>> {
		return $api.delete<Project>(
			`projects/related-project?source=${sourceProjectId}&target=${targetProjectId}`,
		)
	}
}
