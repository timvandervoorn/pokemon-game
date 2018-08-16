import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator"
import { Board, Symbol, Row } from "./entities"

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {
  validate(board: Board) {
    const symbols = ["x", "o", null]
    return (
      board.length === 3 &&
      board.every(
        row => row.length === 3 && row.every(symbol => symbols.includes(symbol))
      )
    )
  }
}

export const isValidTransition = (
  playerSymbol: Symbol,
  from: Board,
  to: Board
) => {
  const changes = from
    .map((row, rowIndex) =>
      row.map((symbol, columnIndex) => ({
        from: symbol,
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return (
    changes.length === 1 &&
    changes[0].to === playerSymbol &&
    changes[0].from === null
  )
}

export const calculateWinner = (board: Board): Symbol | null =>
  board
    .concat(
      // vertical winner
      [0, 1, 2].map(n => board.map(row => row[n])) as Row[]
    )
    .concat([
      // diagonal winner ltr
      [0, 1, 2].map(n => board[n][n]),
      // diagonal winner rtl
      [0, 1, 2].map(n => board[2 - n][n])
    ] as Row[])
    .filter(row => row[0] && row.every(symbol => symbol === row[0]))
    .map(row => row[0])[0] || null

export const finished = (board: Board): boolean =>
  board.reduce((a, b) => a.concat(b) as Row).every(symbol => symbol !== null)

export const checkWinner = (pokemon, player) => {
  if (pokemon.health === 0) {
    if (player.symbol === "x") {
      return "o"
    } else if (player.symbol === "o") {
      return "x"
    }
  }
  return
}

export const checkMove = async (pokemonToUpdate, update) => {
  let hitChance

  switch (update.payload.damage) {
    case 10:
      hitChance = Math.random()
      if (hitChance < 0.9) {
        pokemonToUpdate.health = pokemonToUpdate.health - update.payload.damage
        if (pokemonToUpdate.health <= 0) {
          pokemonToUpdate.health = 0
        }
      } else {
        console.log("MISS!")
        console.log(pokemonToUpdate.health)
      }

      break

    case 15:
      hitChance = Math.random()
      if (hitChance < 0.8) {
        pokemonToUpdate.health = pokemonToUpdate.health - update.payload.damage
        if (pokemonToUpdate.health <= 0) {
          pokemonToUpdate.health = 0
        }
      } else {
        console.log("MISS!")
        console.log(pokemonToUpdate.health)
      }

      break

    case 20:
      hitChance = Math.random()
      if (hitChance < 0.7) {
        console.log("HIT!")
        pokemonToUpdate.health = pokemonToUpdate.health - update.payload.damage
        if (pokemonToUpdate.health <= 0) {
          pokemonToUpdate.health = 0
        }
        console.log(pokemonToUpdate.health)
      } else {
        console.log("MISS!")
        console.log(pokemonToUpdate.health)
      }

      break

    case 25:
      hitChance = Math.random()
      if (hitChance < 0.6) {
        console.log("HIT!")
        pokemonToUpdate.health = pokemonToUpdate.health - update.payload.damage
        if (pokemonToUpdate.health <= 0) {
          pokemonToUpdate.health = 0
        }
        console.log(pokemonToUpdate.health)
      } else {
        console.log("MISS!")
        console.log(pokemonToUpdate.health)
      }

      break
    default:
      return pokemonToUpdate
  }

  return pokemonToUpdate
}
