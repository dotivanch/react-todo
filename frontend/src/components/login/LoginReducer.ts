const initial_state = {
    token: '',
    loggedIn: false,
};

export default (state: any = initial_state, action: any): any => {
    switch(action.type) {
        case 'LOGIN':
            return { ...state, token: action.payload, loggedIn: true };
        case 'LOGOUT':
            return { ...state, token: '', loggedIn: false };
        default:
            return state;
    }
};
