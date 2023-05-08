import dayjs from 'dayjs'

const REQUIRED_FIELD = 'Обязательно для заполнения'

export const emailValidation = {
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		if (value.match(/^[A-Za-z0-9+_.-]+@(.+)$/)) return true
		return 'Некорректный email адрес'
	},
}

export const passwordValidation = {
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		return /^.{6,16}$/.test(value)
			? true
			: 'Пароль должен быть от 6 до 16 символов'
	},
}

export const requiredValidation = {
	required: REQUIRED_FIELD,
}

export const phoneValidation = {
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		if (value.match(/^\+?(\d){1,13}$/g)) return true
		return 'Некорректный номер телефона'
	},
}

export const numberValidation = {
	validate: (value: number | undefined) => {
		if (value === undefined || value === null) {
			return true
		}
		if (value.toString().match(/^\d+$/)) {
			return true
		}
		return 'Только положительные значения'
	},
}

export const telegramUsernameValidation = {
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		return /^[a-zA-Z0-9_]{5,32}$/.test(value)
			? true
			: 'Некорректный telegram логин'
	},
}

const updateValidation = (
	value: string,
	rule: RegExp,
	message: string,
): boolean | string => {
	if (!value || value === '') {
		return true
	}
	return rule.test(value) ? true : message
}

export const updateEmailValidation = {
	validate: (value: string) =>
		updateValidation(
			value,
			/^[A-Za-z0-9+_.-]+@(.+)$/,
			'Некорректный email адрес',
		),
}

export const updatePasswordValidation = {
	validate: (value: string) =>
		updateValidation(
			value,
			/^.{6,16}$/,
			'Пароль должен быть от 6 до 16 символов',
		),
}

export const updatePhoneValidation = {
	validate: (value: string) =>
		updateValidation(value, /^\+?(\d){1,13}$/g, 'Некорректный номер телефона'),
}

export const updateTelegramLoginValidation = {
	validate: (value: string) =>
		updateValidation(
			value,
			/^[a-zA-Z0-9_]{5,32}$/,
			'Некорректный telegram логин',
		),
}

export const hourValidation = {
	required: REQUIRED_FIELD,
	validate: (value: number) => {
		if (value >= 1 && value <= 12) return true
		return ' Введите число от 1 до 12'
	},
}

export const hoursDateValidation = {
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		const selectedDate = dayjs(value)
		const currentDate = dayjs()
		if (selectedDate.isAfter(currentDate)) {
			return 'Не может быть больше сегодняшней даты'
		}
	},
}
