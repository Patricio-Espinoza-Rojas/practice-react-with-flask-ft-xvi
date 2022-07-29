import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        // Definir todas mis variables
        store: {
            apiURl: 'https://5000-ljavierrodr-practicerea-3izbv1tan3w.ws-us54.gitpod.io',
            email: '',
            password: '',
            name: '',
            biography: '',
            errors: null,
            currentUser: null,
        },
        // Definir todas mis funciones 
        actions: {
            handleChange: e => {
                const { name, value } = e.target;
                setStore({
                    [name]: value
                })
            },
            handleLogin: async (e, history) => {
                e.preventDefault();
                const { apiURl, email, password } = getStore();
                const fields = {
                    email: email,
                    password: password
                }
                const response = await fetch(`${apiURl}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fields)
                });

                const { status, message, data } = await response.json();

                console.log(data);

                if (status === 'failed') {
                    toast.error(message);
                }

                if (status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    sessionStorage.setItem('currentUser', JSON.stringify(data));
                    setStore({
                        currentUser: data,
                        email: '',
                        password: '',
                    })

                    history.push('/');
                }

            },

            handleRegister: async (e, history) => {
                e.preventDefault();
                const { apiURl, email, password } = getStore();
                const fields = {
                    email: email,
                    password: password
                }
                const response = await fetch(`${apiURl}/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fields)
                });

                const { status, message, data } = await response.json();

                console.log(data);

                if (status === 'failed') {
                    toast.error(message);
                }

                if (status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    sessionStorage.setItem('currentUser', JSON.stringify(data));
                    setStore({
                        currentUser: data,
                        password: ''
                    })

                    history.push('/');
                }

            },
            loadProfile: () => {
                const { currentUser}  = getStore();
                if(currentUser !== null){
                    setStore({
                        email: currentUser?.user.email,
                        password: '',
                        name: currentUser?.user?.profile?.name,
                        biography: currentUser?.user?.profile?.biography
                    })
                }
            },
            checkAuthentication: () => {
                if (sessionStorage.getItem('currentUser')) {
                    setStore({
                        currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
                    })
                }
            },
            handleLogout: () => {
                if (sessionStorage.getItem('currentUser')) {
                    sessionStorage.removeItem('currentUser');
                    setStore({
                        email: '',
                        password: '',
                        currentUser: null,
                    })
                    getActions().checkAuthentication();
                }
            },
            handleProfile: async (e) => {
                e.preventDefault();
                const { apiURl, email, password, name, biography, currentUser } = getStore();
                const fields = {
                    email: email,
                    password: password,
                    name: name,
                    biography: biography
                }
                const response = await fetch(`${apiURl}/api/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser?.access_token}`
                    },
                    body: JSON.stringify(fields)
                });

                const { status, message, data } = await response.json();

                console.log(data);

                if (status === 'failed') {
                    toast.error(message);
                }

                if (status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    sessionStorage.setItem('currentUser', JSON.stringify(data));
                    setStore({
                        currentUser: data,
                        password: ''
                    })
                }
            }
        }
    }
}

export default getState;