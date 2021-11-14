const initState = {
    'user': null
}

const UserReducer = (state=initState, action) => {
    switch (action.type){
        case "USER_LOGIN":
            return {
                ...state,
                'user' : action.payload 
            }
        default:
            return state
    }
}

export default UserReducer