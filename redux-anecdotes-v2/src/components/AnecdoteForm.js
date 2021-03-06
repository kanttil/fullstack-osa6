import React from 'react'
import { createNew } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        this.props.createNew(content)
        this.props.notify(`you created '${content}'`, 5)
    }

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote' /></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    createNew,
    notify
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
