import React from 'react'
import LoginForm from './LoginForm'
import FormContainer from '../../../components/FormContainer'

const LoginPage: React.FC = () => {
	return <FormContainer Component={<LoginForm />} />
}
export default LoginPage
