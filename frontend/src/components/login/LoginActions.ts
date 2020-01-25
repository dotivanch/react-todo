export const login = (token: string, username: string, name: string) => {
    
    let info = {
        token: token,
        username: username,
        name: name
    }

    localStorage.setItem('@todoapp/login', JSON.stringify(info));

    return { 
        type: 'LOGIN',
        payload: info
    }
}

export const logout = () => {

    localStorage.removeItem('@todoapp/login');

    return {
        type: 'LOGOUT'
    }
};