import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { getGames, joinGame, updateGame } from "../../actions/games"
import { getUsers } from "../../actions/users"
import { userId } from "../../jwt"
import { getPokemon, updatePokemonGame } from "../../actions/pokemon"
import { getTrainers } from "../../actions/trainers"
import Paper from "material-ui/Paper"
import "./GameDetails.css"
import BattleArena from "../battlearena/BattleArena"
import { attack, item, pokemon, run } from "../../constants"

class GameDetails extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      if (this.props.pokemon === null) this.props.getPokemon()
      if (this.props.trainers === null) this.props.getTrainers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  selectMove = (move, payload, pokemonId) => {
    const { game, updatePokemonGame, users } = this.props

    switch (move) {
      case attack:
        updatePokemonGame(game.id, move, payload, pokemonId)
        break
      case item:
        updatePokemonGame(game.id, move, payload, pokemonId)
        break
      case pokemon:
        break
      case run:
        break
      default:
        break
    }
  }

  render() {
    const { game, users, authenticated, userId, pokemon, trainers } = this.props

    if (!authenticated) return <Redirect to="/login" />

    if (game === null || users === null) return "Loading..."
    if (!game) return "Not found"

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (
      <Paper className="outer-paper">
        <h1>Game #{game.id}</h1>

        <p>Status: {game.status}</p>

        {game.status === "started" &&
          player &&
          player.symbol === game.turn && <div>It's your turn!</div>}

        {game.status === "pending" &&
          game.players.map(p => p.userId).indexOf(userId) === -1 && (
            <button onClick={this.joinGame}>Join Game</button>
          )}

        {winner && <p>Winner: {users[winner].firstName}</p>}

        <hr />

        {game.status !== "pending" && (
          <BattleArena
            userId={userId}
            selectMove={this.selectMove}
            game={game}
            allPokemon={pokemon}
          />
        )}
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  pokemon: state.pokemon,
  trainers: state.trainers
})

const mapDispatchToProps = {
  getGames,
  getUsers,
  joinGame,
  updateGame,
  getPokemon,
  getTrainers,
  updatePokemonGame
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
