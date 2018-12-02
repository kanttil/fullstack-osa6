import React from 'react'
import Filter from './Filter'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
    handleClick = (anecdote) => async () => {
        this.props.vote(anecdote)
        this.props.notify(`you voted '${anecdote.content}'`, 5)
    }

    render() {
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter />
                {this.props.anecdotesToShow.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={this.handleClick(anecdote)}>
                                vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter)
    ).sort((a, b) => b.votes - a.votes)
} 

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
    }
}

const mapDispatchToProps = {
    vote,
    notify
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
