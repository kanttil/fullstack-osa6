import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
    if (action.type === 'VOTE') {
        const voted = action.data
        return state.map(a => a.id !== voted.id ? a : voted)
    }

    if (action.type === 'CREATE') {
        return [...state, action.data]
    }

    if (action.type === 'INIT') {
        return action.data
    }

    return state
}

export const vote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = {
            content: anecdote.content,
            votes: anecdote.votes + 1
        }
        const votedAnecdote = await anecdoteService.update(anecdote.id, newAnecdote)
        dispatch({
            type: 'VOTE',
            data: votedAnecdote
        })
    }
}

export const createNew = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            data: anecdotes
        })
    }
}

export default anecdoteReducer