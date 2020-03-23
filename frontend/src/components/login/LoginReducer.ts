const initial_state = {
    token: '',
    username: '',
    name: '',
    loggedIn: false,
};

export default (state: any = initial_state, action: any): any => {
    switch(action.type) {
        case 'LOGIN':
            return { ...state,
                    username: action.payload.username,
                    name: action.payload.name,
                    token: action.payload.token,
                    loggedIn: true };
        case 'LOGOUT':
            return { ...state, token: '', loggedIn: false };
        default:
            return state;
    }
};
