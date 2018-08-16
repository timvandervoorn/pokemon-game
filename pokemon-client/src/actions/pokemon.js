import * as request from "superagent"
import { baseUrl } from "../constants"
import { logout } from "./users"
import { isExpired } from "../jwt"

export const UPDATE_POKEMON = "UPDATE_POKEMON"
export const UPDATE_GAME_SUCCESS = "UPDATE_GAME_SUCCESS"

const updateGameSuccess = () => ({
  type: UPDATE_GAME_SUCCESS
})

const updatePokemon = pokemon => ({
  type: UPDATE_POKEMON,
  payload: pokemon
})

export const getPokemon = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/pokemon`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(updatePokemon(result.body.pokemon)))
    .catch(err => console.error(err))
}

export const updatePokemonGame = (gameId, move, payload, opponentPokemonId) => (
  dispatch,
  getState
) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({ move, payload, opponentPokemonId })
    .then(_ => dispatch(updateGameSuccess()))
    .catch(err => console.error(err))
}
