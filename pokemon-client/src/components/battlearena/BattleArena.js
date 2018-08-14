import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { getPokemon } from "../../actions/pokemon"
import { getTrainers } from "../../actions/trainers"
import { userId } from "../../jwt"
import { Redirect } from "react-router-dom"

class BattleArena extends PureComponent {
  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>BattleArena is rendered</h1>

        <div>
          {this.props.pokemon && (
            <div>
              <p>User id: {this.props.userId}</p>
              <p>Pokemon 1: {this.props.pokemon[0].name}</p>
              <p>Pokemon 2: {this.props.pokemon[1].name}</p>
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
