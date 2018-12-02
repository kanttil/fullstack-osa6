const notificationReducer = (state = null, action) => {
    if(action.type === 'SET') {
        return action.data
    }

    if(action.type === 'CLEAR') {
        return null
    }

    return state
}

export const notify = (notification, seconds) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET',
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, seconds*1000)
    }
}

export default notificationReducer