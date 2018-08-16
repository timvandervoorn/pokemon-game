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
    this.state = { fight: true, item: true, pokemon: true, run: true, initial: true, fight2: false }
  }

  handleClick = e => {
    const test = Object.values(e.target)
    const name = test[1].name
    const value = test[1].value
    this.setState({
      [name]: value,
      initial: false
    })
  }

  handleItem = () => {
    this.setState({
      item: !this.state.item
    })
  }

  handlePokemon = () => {
    this.setState({
      pokemon: !this.state.pokemon
    })
  }

  handleRun = () => {
    this.setState({
      run: !this.state.run
    })
  }

  handleMove = (move, payload, opponentPokemonId) => {
    if (move === "attack") {
      this.setState({
        fight: !this.state.fight,
        fight2: this.state.fight2
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

    console.log(opponentPokemon.health)

    return (
      <div>
        {!pokemon && "Loading"}
        <h1>BattleArena is rendered</h1>

        <div className="battle-scene">
          <div className="box-top-left">
            {pokemon && <h2 className="pokemon">{opponentPokemon.name}</h2>}
            <div className="hp-bar-top">
              <div className="hp-bar-fill" style={{width: `${opponentPokemon.health}%`}} />
            </div>
            <h4 className="level">lvl. 15</h4>
          </div>
          <div className="box-top-right">
            <img
              class="pokemon-top"
              src={require(`../../images/${opponentPokemon.name.toLowerCase()}.png`)}
            />
          </div>
          <div className="box-bottom-left">
            <img
              class="pokemon-bottom"
              src={require(`../../images/${pokemon.name.toLowerCase()}.png`)}
            />
          </div>
          <div className="box-bottom-right">
            {pokemon && <h2 className="pokemon">{pokemon.name}</h2>}
            <div className="hp-bar-bottom">
              <div className="hp-bar-fill" style={{width: `${pokemon.health}%`}} />
            </div>
            <h4 className="level">lvl. </h4>
            {pokemon.name && (
              <h4 className="hp">
                {pokemon.health}
                /100 hp
              </h4>
            )}
          </div>
          <div className="bottom-menu">
          <ToggleDisplay if={pokemon.health === "0"}>
            <div className="battle-text text-box-left">
              <h4>You've lost the battle!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={opponentPokemon.health === "0"}>
            <div className="battle-text text-box-left">
              <h4>You've won the battle!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={this.state.initial && pokemon.health !== "0" && opponentPokemon.health !== ""}>
            <div className="battle-text text-box-left">
              <h4>Challenge your fellow Codaisseur student and see who's the grand PokeMaster!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={!this.state.run}>
            <div className="battle-text text-box-left">
              <h4>Oh noes! You're unable to run! Fight till you faint!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={!this.state.pokemon}>
            <div className="battle-text text-box-left">
              <h4>You dont have any pokemon left!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={!this.state.item}>
            <div className="battle-text text-box-left">
              <h4>Choose your item!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={this.state.fight2 && !this.state.initial}>
            <div className="battle-text text-box-left">
              <h4>{pokemon.name} used {pokemon.attacks[0].name} It was a {this.props.game.hitOrMiss}!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={!this.state.fight}>
            <div className="battle-text text-box-left">
              <h4>Which move will {pokemon.name} use?!</h4>
            </div>
          </ToggleDisplay>

            <ToggleDisplay fight={!this.state.fight}>
              <div className="text-box-right">
                <h4 name="fight" value={!this.state.fight} className="battle-text-top-left" onClick={this.handleClick}>
                  Fight
                </h4>
                <h4 name="item" value={!this.state.item} className="battle-text-bottom-left" onClick={this.handleClick}>
                  Item
                </h4>
                <h4 name="pokemon" value={!this.state.pokemon}className="battle-text-top-right" onClick={this.handleClick}>
                  Pokemon
                </h4>
                <h4 name="run" value={!this.state.run}className="battle-text-bottom-right" onClick={this.handleClick}>
                  Run
                </h4>
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.fight}>
              <div className="text-box-right">
                {pokemon && (
                  <div>
                    <h4
                      className="battle-text-top-left"
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
                      className="battle-text-bottom-left"
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
                      className="battle-text-top-right"
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
                      className="battle-text-bottom-right"
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
            <ToggleDisplay if={!this.state.item}>
              <div className="text-box-right">
                {pokemon && (
                  <div>
                    <h4 className="battle-text-top-left" onClick={this.handleItem}>
                      (1x) Potion 30HP
                    </h4>
                    <h4 className="battle-text-bottom-left" onClick={this.handleItem}>
                      Revive
                    </h4>
                    <h4 className="battle-text-top-right" onClick={this.handleItem}>
                      Codaisseur coffee
                    </h4>
                  </div>
                )}
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.pokemon}>
              <div className="text-box-right">
                {pokemon && (
                  <div>
                    <h4 className="battle-text-top-left" onClick={this.handlePokemon}>
                      Choose your pokemon!
                    </h4>
                    <h4 className="battle-text-bottom-left" onClick={this.handlePokemon}>
                      Blastoise
                    </h4>
                  </div>
                )}
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.run}>
              <div className="text-box-right">
                {pokemon && (
                  <div>
                    <h4 className="battle-text-top-left" onClick={this.handleRun}>
                      Back to battle!
                    </h4>
                  </div>
                )}
              </div>
            </ToggleDisplay>
          </div>
        </div>
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
