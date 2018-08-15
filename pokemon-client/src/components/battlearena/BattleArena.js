import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getPokemon } from "../../actions/pokemon"
import { getTrainers } from "../../actions/trainers"
import { userId } from "../../jwt"
import { Redirect } from "react-router-dom"
import { attack, item, pokemon, run } from "../../constants"

class BattleArena extends PureComponent {
  handleClick = (move, type, userId, trainers, opponentPokemon) => {
    this.props.selectMove(move, type, userId, trainers, opponentPokemon)
  }

  render() {
    const { trainers, player, userId, battlearena } = this.props

    if (battlearena === null) return "Loading..."

    let trainer
    let opponentTrainer

    if (userId === 1) {
      trainer = battlearena[0]
      opponentTrainer = battlearena[1]
    }

    if (userId === 2) {
      trainer = battlearena[1]
      opponentTrainer = battlearena[0]
    }

    return (
      <div>
        <h1>BattleArena is rendered</h1>

        {console.log(this.props.battlearena)}

        <div>
          {this.props.trainers && (
            <div>
              <p>User id: {userId}</p>
              <p>Current pokemon: {trainer.pokemons[0].name}</p>
              <p>Health: {trainer.pokemons[0].health}</p>
              <p>Attacks</p>
              <ul>
                {trainer.pokemons[0].attacks.map(pokeAttack => {
                  return (
                    <li key={pokeAttack.name}>
                      <button
                        onClick={() =>
                          this.handleClick(
                            pokeAttack,
                            attack,
                            userId,
                            opponentTrainer,
                            opponentTrainer.pokemons[0]
                          )
                        }
                      >
                        {pokeAttack.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <p>
                Pokemon on the bench:
                {trainer.pokemons[1].name}, {trainer.pokemons[2].name},
              </p>
            </div>
          )}
        </div>

        {/* <div>
          {this.props.pokemon && (
            <div>
              <p>User id: {this.props.userId}</p>
              <p>Pokemon 1: {this.props.pokemon[0].name}</p>
              <ul>
                {this.props.pokemon[0].attacks.map(pokeAttack => {
                  return (
                    <li key={pokeAttack.name}>
                      <button
                        onClick={() => this.handleClick(pokeAttack, attack)}
                      >
                        {pokeAttack.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <p>Pokemon 2: {this.props.pokemon[1].name}</p>
              <ul>
                {this.props.pokemon[1].attacks.map(attack => {
                  return (
                    <li key={attack.name}>
                      <button>{attack.name}</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = () => {}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleArena)
