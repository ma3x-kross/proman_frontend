import { AxiosResponse } from 'axios'
import $api from '../http'
import { Payroll } from '../interfaces/PayrollInterface'

export default class PayrollService {

	static async getPayrolls(
		start?: string,
		end?: string,
	): Promise<AxiosResponse<Payroll[]>> {
		return $api.get<Payroll[]>(
			`payroll/${start && end ? `?start=${start}&end=${end}` : ''}`,
		)
	}
}
