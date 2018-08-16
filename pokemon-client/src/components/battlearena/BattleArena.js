import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getPokemon } from "../../actions/pokemon"
import "./battleArena.css"
import ToggleDisplay from "react-toggle-display"
import startBattleAudio from '../../audio/115-battlevstrainer.mp3'
import winnerAudio from '../../audio/116-victoryvstrainer.mp3'

class BattleArena extends PureComponent {
  constructor() {
    super()
    this.state = {
      fight: true,
      item: true,
      pokemon: true,
      run: true,
      initial: true,
      fight2: true,
      attack: ""
    }
  }


  sound = new Audio(startBattleAudio)
  soundWinner = new Audio(winnerAudio)

 onPlay(){
   this.sound.play();
 }

 onPause(){
  this.sound.pause();
}

 onWinner(){
   this.soundWinner.play()
 }

  handleClick = e => {
    const test = Object.values(e.target)
    const name = test[1].name
    const value = test[1].value
    this.setState({
      [name]: value,
      initial: false,
      fight2: true
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
    console.log(payload)
    if (move === "attack") {
      this.setState({
        fight: !this.state.fight,
        fight2: !this.state.fight2,
        attack: payload.name
      })

      if (move === "item") {
        this.setState({
          item: !this.state.item
        })
      }
    }

    this.props.selectMove(move, payload, opponentPokemonId)
  }

  render() {
    const { userId, game, selectMove } = this.props
    if(game.status === "started"){
    this.onPlay()
    }

    if(game.status === "finished"){
      this.onPause()
      this.onWinner()
    }

    if (game === null) return "Loading..."

    let pokemon
    let opponentPokemon

    game.players.forEach(player => {
      if (player.userId === userId) {
        pokemon = player.pokemon
        Number(pokemon.health)
      } else {
        opponentPokemon = player.pokemon
        Number(opponentPokemon.health)
      }
    })

    return (
      <div>
        {!pokemon && "Loading"}
        <h1>BattleArena is rendered</h1>

        <div className="battle-scene">
          <div className="box-top-left">
            {pokemon && <h2 className="pokemon">{opponentPokemon.name}</h2>}
            <ToggleDisplay if={opponentPokemon.health < 70 && opponentPokemon.health > 30 }>
            <div className="hp-bar-top">
              <div className="hp-bar-fill" style={{width: `${opponentPokemon.health}%`, background: "yellow"}} />
            </div>
            </ToggleDisplay>
            <ToggleDisplay if={opponentPokemon.health <= 100 && opponentPokemon.health > 70}>
            <div className="hp-bar-top">
              <div className="hp-bar-fill" style={{width: `${opponentPokemon.health}%`, background: "green"}} />
            </div>
            </ToggleDisplay>
            <ToggleDisplay if={opponentPokemon.health <= 30}>
            <div className="hp-bar-top">
              <div className="hp-bar-fill" style={{width: `${opponentPokemon.health}%`, background: "red"}} />
            </div>
            </ToggleDisplay>
            <h4 className="level">lvl. 15</h4>
          </div>
          <ToggleDisplay if={opponentPokemon.health !== "0"}>
          <div className="box-top-right">
            <img
              class="pokemon-top"
              src={require(`../../images/${opponentPokemon.name.toLowerCase()}.png`)}
            />
          </div>
          </ToggleDisplay>
          <ToggleDisplay if={opponentPokemon.health === "0"}>
          <div className="box-top-right">
          </div>
          </ToggleDisplay>
          <ToggleDisplay if={pokemon.health !== "0"}>
          <div className="box-bottom-left">
            <img
              class="pokemon-bottom"
              src={require(`../../images/${pokemon.name.toLowerCase()}.png`)}
            />
          </div>
          </ToggleDisplay>
          <ToggleDisplay if={pokemon.health === "0"}>
          <div className="box-bottom-left">
          </div>
          </ToggleDisplay>
          <div className="box-bottom-right">
            {pokemon && <h2 className="pokemon">{pokemon.name}</h2>}
            <ToggleDisplay if={pokemon.health < 101}>
            <div className="hp-bar-bottom">
              <div className="hp-bar-fill" style={{width: `${pokemon.health}%`, background: "green"}} />
            </div>
            </ToggleDisplay>
            <ToggleDisplay if={pokemon.health < 70}>
            <div className="hp-bar-bottom">
              <div className="hp-bar-fill" style={{width: `${pokemon.health}%`, background: "yellow"}} />
            </div>
            </ToggleDisplay>
            <ToggleDisplay if={pokemon.health < 30}>
            <div className="hp-bar-bottom">
              <div className="hp-bar-fill" style={{width: `${pokemon.health}%`, background: "red"}} />
            </div>
            </ToggleDisplay>
            <h4 className="level">lvl. </h4>
            {pokemon.name && (
              <h4 className="hp">
                {pokemon.health}
                /100 hp
              </h4>
            )}
          </div>
          <div className="bottom-menu">
          <ToggleDisplay if={pokemon.health === 0}>
            <div className="battle-text text-box-left">
              <h4>You've lost the battle!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={opponentPokemon.health === 0}>
            <div className="battle-text text-box-left">
              <h4>You've won the battle!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={this.state.initial && pokemon.health !== 0 && opponentPokemon.health !== ""}>
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
          <ToggleDisplay if={!this.state.fight2 && !this.state.initial && pokemon.health !== 0 && opponentPokemon.health !== 0}>
            <div className="battle-text text-box-left">
              <h4>{pokemon.name} used {this.state.attack} It was a {this.props.game.hitOrMiss}!</h4>
            </div>
          </ToggleDisplay>
          <ToggleDisplay if={!this.state.fight}>
            <div className="battle-text text-box-left">
              <h4>Which move will {pokemon.name} use?!</h4>
            </div>
          </ToggleDisplay>

            <ToggleDisplay fight={!this.state.fight}>
              <div className="text-box-right">
                <h4
                  name="fight"
                  value={!this.state.fight}
                  className="battle-text-top-left"
                  onClick={this.handleClick}
                >
                  Fight
                </h4>
                <h4
                  name="item"
                  value={!this.state.item}
                  className="battle-text-bottom-left"
                  onClick={this.handleClick}
                >
                  Item
                </h4>
                <h4
                  name="pokemon"
                  value={!this.state.pokemon}
                  className="battle-text-top-right"
                  onClick={this.handleClick}
                >
                  Pokemon
                </h4>
                <h4
                  name="run"
                  value={!this.state.run}
                  className="battle-text-bottom-right"
                  onClick={this.handleClick}
                >
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
                      name={pokemon.attacks[0]}
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
                      name={pokemon.attacks[1]}
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
                      name={pokemon.attacks[2]}
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
                      name={pokemon.attacks[3]}
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
                      Potion +20HP
                    </h4>
                    <h4
                      className="battle-text-bottom-left"
                      onClick={this.handleItem}
                    >
                      Revive
                    </h4>
                    <h4
                      className="battle-text-top-right"
                      onClick={this.handleItem}
                    >
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
                    <h4
                      className="battle-text-top-left"
                      onClick={this.handlePokemon}
                    >
                      Choose your pokemon!
                    </h4>
                    <h4
                      className="battle-text-bottom-left"
                      onClick={this.handlePokemon}
                    >
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
                    <h4
                      className="battle-text-top-left"
                      onClick={this.handleRun}
                    >
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
