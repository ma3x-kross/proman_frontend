import React from 'react';
import LoginForm from './components/LoginForm';
import {Context} from './index';
import {observer} from 'mobx-react-lite';
import {IUser} from './models/IUser';
import UserService from './services/UserService';

function App() {

    const {store} = React.useContext(Context)

    const [users, setUsers] = React.useState<IUser[]>([])

    React.useEffect(()=>{
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [])

    async function getUsers(){
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    if(store.loading) {
        return <div>Загрузка...</div>
    }

   if(!store.isAuth){

       return  <div>
           <LoginForm />
           <button onClick={getUsers}>Получить пользователей</button>
       </div>
   }

  return (
    <div className="App">
        <h1>{store.isAuth? `Пользователь авторизован ${store.user.email}`: 'Авторизуйтесь'}</h1>
        <button onClick={()=>store.logout()}>Выйти</button>
        <button onClick={getUsers}>Получить пользователей</button>

        {users.map(user=>
            <div key={user.email}>{user.email}</div>)}
    </div>
  );
}

export default observer(App);
