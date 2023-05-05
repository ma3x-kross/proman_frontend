import { makeAutoObservable } from 'mobx'
import {
	CreateProjectDto,
	Project,
	UpdateProjectDto,
} from '../../interfaces/ProjectsInterfaces'
import ProjectService from '../../services/ProjectService'

class ProjectStore {
	loading: boolean = false
	projects: Project[] = []
	project: Project = {} as Project

	projectsNamesAndIds: { id: number; name: string }[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setLoading(bool: boolean) {
		this.loading = bool
	}

	setProjects(projects: Project[]) {
		this.projects = projects
	}

	setProjectsNamesAndIds(projects: Project[]) {
		this.projectsNamesAndIds = projects.map((project) => ({
			id: project.id,
			name: project.name,
		}))
	}

	setProject(project: Project) {
		this.project = project
	}

	async createProject(dto: CreateProjectDto) {
		try {
			const response = await ProjectService.createProject(dto)
			console.log(response.data)
			return true
		} catch (e: any) {
			console.log(e.response?.errors?.message)
			return false
		}
	}

	async getProjects() {
		try {
			this.setLoading(true)
			const response = await ProjectService.fetchProjects()
			this.setProjects(response.data)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async getProjectsNamesAndIds() {
		try {
			const response = await ProjectService.fetchProjects()
			this.setProjectsNamesAndIds(response.data)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async getOneProject(id: number) {
		try {
			this.setLoading(true)
			const response = await ProjectService.fetchOneProject(id)
			this.setProject(response.data)
			console.log(response.data)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async deleteProject(id: number) {
		try {
			await ProjectService.deleteProject(id)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async updateProject(id: number, dto: UpdateProjectDto) {
		try {
			console.log(id)
			const response = await ProjectService.updateProject(id, dto as Project)
			this.setProject(response.data)
			console.log(response)
			return true
		} catch (e: any) {
			console.log(e.response?.data?.message)
			return e.response?.data?.message
		}
	}

	async addUserToProject(userId: number, projectId: number, role?: string) {
		try {
			if (role === 'Разработчик') {
				const response = await ProjectService.addDeveloperToProject(
					userId,
					projectId,
				)
				this.setProject(response.data)
				return true
			}
			const response = await ProjectService.updateProject(projectId, {
				managerId: userId,
			} as Project)
			this.setProject(response.data)
			return true
		} catch (e: any) {
			console.log(e.response?.data?.message)
			return false
		}
	}

	async deleteUserFromProject(userId: number, projectId: number, role: string) {
		try {
			if (role === 'Разработчик') {
				await ProjectService.deleteDeveloperFromProject(userId, projectId)
				this.setProject({
					...this.project,
					developers: this.project.developers.filter(
						(developer) => developer.id !== userId,
					),
				})
			} else {
				await ProjectService.updateProject(projectId, {
					managerId: null,
				} as Project)
				this.setProject({ ...this.project, manager: undefined })
			}
			return true
		} catch (e: any) {
			console.log(e.response?.data?.message)
			return false
		}
	}

	async addSubproject(sourceProjectId: number, targetProjectId: number) {
		try {
			const response = await ProjectService.addSubproject(
				sourceProjectId,
				targetProjectId,
			)
			this.setProject(response.data)
		} catch (e: any) {
			console.log(e.response?.data?.message)
			return false
		}
	}

	async deleteSubproject(sourceProjectId: number, targetProjectId: number) {
		try {
			const response = await ProjectService.deleteSubproject(
				sourceProjectId,
				targetProjectId,
			)
			this.setProject(response.data)
		} catch (e: any) {
			console.log(e.response?.data?.message)
			return false
		}
	}
}

export default new ProjectStore()
