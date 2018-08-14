import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getPokemon } from "../../actions/pokemon"
import { getTrainers } from "../../actions/trainers"
import { userId } from "../../jwt"
import { Redirect } from "react-router-dom"

class BattleArena extends PureComponent {
  componentDidUpdate() {}

  handleClick = (attack, damage) => {
    this.props.attack(attack, damage)
  }

  render() {
    return (
      <div>
        <h1>BattleArena is rendered</h1>

        <div>
          {this.props.pokemon && (
            <div>
              <p>User id: {this.props.userId}</p>
              <p>Pokemon 1: {this.props.pokemon[0].name}</p>
              <ul>
                {this.props.pokemon[0].attacks.map(attack => {
                  return (
                    <li>
                      <button
                        onClick={() =>
                          this.handleClick(attack.name, attack.damage)
                        }
                      >
                        {attack.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <p>Pokemon 2: {this.props.pokemon[1].name}</p>
              <ul>
                {this.props.pokemon[1].attacks.map(attack => {
                  return (
                    <li>
                      <button>{attack.name}</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleArena)
