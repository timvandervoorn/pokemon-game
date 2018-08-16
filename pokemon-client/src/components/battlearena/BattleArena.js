import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getPokemon } from "../../actions/pokemon"
import { getTrainers } from "../../actions/trainers"
import { userId } from "../../jwt"
import { Redirect } from "react-router-dom"
import { attack, item, pokemon, run } from "../../constants"
import "./battleArena.css"
import ToggleDisplay from "react-toggle-display"

class BattleArena extends PureComponent {
  constructor() {
    super()
    this.state = { show: true }
  }

  handleClick = e => {
    e.preventDefault()
    this.setState({
      show: !this.state.show
    })
  }

  handleAttack = () => {
    this.setState({
      show: !this.state.show
    })
  }

  handleMove = (move, payload, opponentPokemonId) => {
    if (move === "attack") {
      this.setState({
        show: !this.state.show
      })
    }

    this.props.selectMove(move, payload, opponentPokemonId)
  }

  render() {
    const { userId, game, selectMove } = this.props

    if (game === null) return "Loading..."

    let pokemon
    let opponentPokemon

    game.players.forEach(player => {
      if (player.userId === userId) {
        pokemon = player.pokemon
      } else {
        opponentPokemon = player.pokemon
      }
    })

    return (
      <div>
        {!pokemon && "Loading"}
        <h1>BattleArena is rendered</h1>

        <div class="battle-scene">
          <div class="box-top-left">
            {pokemon && <h2 class="pokemon">{opponentPokemon.name}</h2>}
            <div class="hp-bar-top">
              <div class="hp-bar-fill" />
            </div>
            <h4 class="level">lvl. 15</h4>
          </div>
          <div class="box-top-right">
            <img
              class="pokemon-top"
              src={require(`../../images/${opponentPokemon.name.toLowerCase()}.png`)}
            />
          </div>
          <div class="box-bottom-left">
            <img
              class="pokemon-bottom"
              src={require(`../../images/${pokemon.name.toLowerCase()}.png`)}
            />
          </div>
          <div class="box-bottom-right">
            {pokemon && <h2 class="pokemon">{pokemon.name}</h2>}
            <div class="hp-bar-bottom">
              <div class="hp-bar-fill" />
            </div>
            <h4 class="level">lvl. </h4>
            {pokemon.name && (
              <h4 class="hp">
                {pokemon.health}
                /100 hp
              </h4>
            )}
          </div>
          <div class="bottom-menu">
            <div class="battle-text text-box-left" />
            <ToggleDisplay show={this.state.show}>
              <div class="text-box-right">
                <h4 class="battle-text-top-left" onClick={this.handleClick}>
                  Fight
                </h4>
                <h4 class="battle-text-bottom-left" onClick={this.handleClick}>
                  Item
                </h4>
                <h4 class="battle-text-top-right" onClick={this.handleClick}>
                  Pokemon
                </h4>
                <h4 class="battle-text-bottom-right" onClick={this.handleClick}>
                  Run
                </h4>
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.show}>
              <div class="text-box-right">
                {pokemon && (
                  <div>
                    <h4
                      class="battle-text-top-left"
                      onClick={() =>
                        this.handleMove(
                          "attack",
                          pokemon.attacks[0],
                          opponentPokemon.id
                        )
                      }
                    >
                      {pokemon.attacks[0].name}
                    </h4>
                    <h4
                      class="battle-text-bottom-left"
                      onClick={() =>
                        this.handleMove(
                          "attack",
                          pokemon.attacks[1],
                          opponentPokemon.id
                        )
                      }
                    >
                      {pokemon.attacks[1].name}
                    </h4>
                    <h4
                      class="battle-text-top-right"
                      onClick={() =>
                        this.handleMove(
                          "attack",
                          pokemon.attacks[2],
                          opponentPokemon.id
                        )
                      }
                    >
                      {pokemon.attacks[2].name}
                    </h4>
                    <h4
                      class="battle-text-bottom-right"
                      onClick={() =>
                        this.handleMove(
                          "attack",
                          pokemon.attacks[3],
                          opponentPokemon.id
                        )
                      }
                    >
                      {pokemon.attacks[3].name}
                    </h4>
                  </div>
                )}
              </div>
            </ToggleDisplay>
          </div>
        </div>

        {/* {console.log(this.props.battlearena)}

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
        </div> */}

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

const mapStateToProps = state => {}

const mapDispatchToProps = {
  getPokemon
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleArena)
