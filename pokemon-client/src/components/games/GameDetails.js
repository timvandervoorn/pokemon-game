import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { getGames, joinGame, updateGame } from "../../actions/games"
import { getUsers } from "../../actions/users"
import { userId } from "../../jwt"
import { getPokemon, updatePokemonGame } from "../../actions/pokemon"
import { getTrainers } from "../../actions/trainers"
import Paper from "material-ui/Paper"
import Board from "./Board"
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

  makeMove = (toRow, toCell) => {
    const { game, updateGame } = this.props

    const board = game.board.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.turn
        else return cell
      })
    )
    updateGame(game.id, board)
  }

  selectMove = (move, type, userId, opponentTrainer, opponentPokemon) => {
    const { game, updatePokemonGame } = this.props

    switch (type) {
      case attack:
        console.log("case attack")
        console.log(move.name)
        console.log(move.damage)
        console.log(userId)
        console.log(opponentPokemon)

        const currentUsers = Object.values(this.props.users)

        function findOpponent(users) {
          return users.id !== userId
        }

        console.log(currentUsers)
        const opponent = currentUsers.find(findOpponent)
        console.log(opponent)

        updatePokemonGame(
          game.id,
          move,
          opponent.id,
          opponentTrainer,
          opponentPokemon
        )

        break
      case item:
        console.log("case item")
        break
      case pokemon:
        console.log("case pokemon")
        break
      case run:
        console.log("case run")
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
          <Board board={game.board} makeMove={this.makeMove} />
        )}

        {/* {game.status !== "pending" && (
          <BattleArena
            pokemon={pokemon}
            trainers={trainers}
            userId={userId}
            selectMove={this.selectMove}
            player={player}
            battlearena={game.trainers}
          />
        )} */}
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
