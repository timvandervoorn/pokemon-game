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
    this.state = { fight: true, item: true, pokemon: true, run: true }
  }

  handleClickFight = () => {
    this.setState({
      fight: !this.state.fight
    })
  }

  handleClickItem = () => {
    this.setState({
      item: !this.state.item
    })
  }

  handleClickPokemon = () => {
    this.setState({
      pokemon: !this.state.pokemon
    })
  }

  handleClickRun = () => {
    this.setState({
      run: !this.state.run
    })
  }

  handleAttack = e => {
    e.preventDefault()
    this.setState({
      fight: !this.state.fight
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

  handleMove = (move, type, userId, trainers, opponentPokemon) => {
    this.props.selectMove(move, type, userId, trainers, opponentPokemon)
  }

  render() {
    const { trainers, players, userId, battlearena, game } = this.props

    if (game === null) return "Loading..."

    let pokemon
    let opponentPokemon

    if (userId === 1) {
      pokemon = game.players[0].pokemon
      opponentPokemon = game.players[1].pokemon
    }

    if (userId === 2) {
      pokemon = game.players[1].pokemon
      opponentPokemon = game.players[0].pokemon
    }

    return (
      <div>
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
              src={require("../../images/charmander.png")}
            />
          </div>
          <div class="box-bottom-left">
            <img
              class="pokemon-bottom"
              src={require("../../images/bulbasaur.png")}
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
            <ToggleDisplay fight={this.state.fight}>
              <div class="text-box-right">
                <h4 class="battle-text-top-left" onClick={this.handleClickFight}>
                  Fight
                </h4>
                <h4 class="battle-text-bottom-left" onClick={this.handleClickItem}>
                  Item
                </h4>
                <h4 class="battle-text-top-right" onClick={this.handleClickPokemon}>
                  Pokemon
                </h4>
                <h4 class="battle-text-bottom-right" onClick={this.handleClickRun}>
                  Run
                </h4>
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.fight}>
              <div class="text-box-right">
                {pokemon && (
                  <div>
                    <h4 class="battle-text-top-left" onClick={this.handleAttack}>
                      {pokemon.attacks[0].name}
                    </h4>
                    <h4 class="battle-text-bottom-left" onClick={this.handleAttack}>
                      {pokemon.attacks[1].name}
                    </h4>
                    <h4 class="battle-text-top-right" onClick={this.handleAttack}>
                      {pokemon.attacks[2].name}
                    </h4>
                    <h4 class="battle-text-bottom-right" onClick={this.handleAttack}>
                      {pokemon.attacks[3].name}
                    </h4>
                  </div>
                )}
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.item}>
              <div class="text-box-right">
                {pokemon && (
                  <div>
                    <h4 class="battle-text-top-left" onClick={this.handleItem}>
                      (1x) Potion 30HP
                    </h4>
                    <h4 class="battle-text-bottom-left" onClick={this.handleItem}>
                      Revive
                    </h4>
                    <h4 class="battle-text-top-right" onClick={this.handleItem}>
                      Codaisseur coffee
                    </h4>
                  </div>
                )}
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.pokemon}>
              <div class="text-box-right">
                {pokemon && (
                  <div>
                    <h4 class="battle-text-top-left" onClick={this.handlePokemon}>
                      Choose your pokemon!
                    </h4>
                    <h4 class="battle-text-bottom-left" onClick={this.handlePokemon}>
                      Blastoise
                    </h4>
                  </div>
                )}
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.run}>
              <div class="text-box-right">
                {pokemon && (
                  <div>
                    <h4 class="battle-text-top-left" onClick={this.handleRun}>
                      Oh noes! Can't run away! Keep fighting!
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

const mapStateToProps = () => {}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleArena)
