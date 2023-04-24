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
		if (value.length < 6) {
			return 'Пароль должен быть длиннее 6 символов'
		}
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
