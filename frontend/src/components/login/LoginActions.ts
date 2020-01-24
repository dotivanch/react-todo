export function login(token: string){
    return { type: 'LOGIN', payload: token };
}

export function logout(){
    return { type: 'LOGOUT' };
}