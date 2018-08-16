import { UPDATE_POKEMON, getPokemon } from "../actions/pokemon"

export default (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_POKEMON:
      return payload

    default:
      return state
  }
}
