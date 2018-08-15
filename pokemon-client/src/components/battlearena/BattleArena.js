import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getPokemon } from "../../actions/pokemon"
import { getTrainers } from "../../actions/trainers"
import { userId } from "../../jwt"
import { Redirect } from "react-router-dom"
import { attack, item, pokemon, run } from "../../constants"
import BattleArenaContainer from "./BattleArenaContainer";

class BattleArena extends PureComponent {
  handleClick = (move, type) => {
    this.props.selectMove(move, type)
  }

  render() {
    return (
      <div>
        <h1>BattleArena is rendered</h1>
        <BattleArenaContainer pokemon={this.props.pokemon}/>

        <div>
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
        </div>
      // </div>
    )
  }
}

const mapStateToProps = () => {}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleArena)
