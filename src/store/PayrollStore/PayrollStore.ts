import { makeAutoObservable } from 'mobx'
import {
	AddHourDto,
	DeveloperHours,
	ProjectHours,
} from '../../interfaces/HoursInterface'
import HoursService from '../../services/HoursService'
import { Payroll } from '../../interfaces/PayrollInterface'
import PayrollService from '../../services/PayrollService'

class PayrollStore {
	hours: DeveloperHours[] = []
	payrolls: Payroll[] = []
	loading: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setLoading(bool: boolean) {
		this.loading = bool
	}

	setHours(hours: DeveloperHours[]) {
		this.hours = hours
	}

	setPayroll(payrolls: Payroll[]) {
		this.payrolls = payrolls
	}

	async getAllHours({ start, end }: { start?: string; end?: string }) {
		try {
			const response = await HoursService.getAllHours(start, end)
			this.setHours(response.data)
			console.log(response)
		} catch (e: any) {
			console.log(e?.response?.data?.message)
		}
	}

	async getPayrolls({ start, end }: { start?: string; end?: string }) {
		try {
			const response = await PayrollService.getPayrolls(start, end)
			this.setPayroll(response.data)
			console.log(response)
		} catch (e: any) {
			console.log(e?.response?.data?.message)
		}
	}
}

export default new PayrollStore()
