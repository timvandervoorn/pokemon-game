import * as request from "superagent"
import { baseUrl } from "../constants"
import { logout } from "./users"
import { isExpired } from "../jwt"

export const UPDATE_TRAINERS = "UPDATE_TRAINERS"

const updateTrainers = trainers => ({
  type: UPDATE_TRAINERS,
  payload: trainers
})

export const getTrainers = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/trainer`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(updateTrainers(result.body.trainer)))
    .catch(err => console.error(err))
}
