import React from 'react';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';

const LoginForm : React.FC = () => {

    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const [firstName, setFirstName] = React.useState<string>('')
    const [secondName, setSecondName] = React.useState<string>('')
    const [surname, setSurname] = React.useState<string>('')
    const [phone, setPhone] = React.useState<number>(0)
    const [tgLogin, setTgLogin] = React.useState<string>('')
    const [roles, setRoles] = React.useState<string[]>([])


    const {store} = React.useContext(Context)

    return (
        <div>
            <input
                onChange = {e=>setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='email'
            />
            <input
                onChange = {e=>setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='password'
            />

            <button onClick={()=>store.login(email, password)}>Логин</button>
            <button onClick={()=>store.invite(firstName, secondName, surname, email, phone, tgLogin, roles)}>Пригласить</button>
        </div>
    );
};

export default observer(LoginForm);