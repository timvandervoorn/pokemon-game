import { UPDATE_TRAINERS } from "../actions/trainers"

export default (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_TRAINERS:
      return payload

    default:
      return state
  }
}
