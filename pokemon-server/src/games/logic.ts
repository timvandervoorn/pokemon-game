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

  if (update.payload.damage) {
    switch (update.payload.damage) {
      case 10:
        hitChance = Math.random()
        if (hitChance < 0.9) {
          pokemonToUpdate.health =
            pokemonToUpdate.health - update.payload.damage
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
          pokemonToUpdate.health =
            pokemonToUpdate.health - update.payload.damage
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
          pokemonToUpdate.health =
            pokemonToUpdate.health - update.payload.damage
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
          pokemonToUpdate.health =
            pokemonToUpdate.health - update.payload.damage
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
  }

  if (update.payload === "potion") {
    pokemonToUpdate.health = Number(pokemonToUpdate.health) + 20
    if (pokemonToUpdate.health >= 100) {
      pokemonToUpdate.health = 100
    }
  }

  if (update.payload === "super-potion") {
    pokemonToUpdate.health = Number(pokemonToUpdate.health) + 30
    if (pokemonToUpdate.health >= 100) {
      pokemonToUpdate.health = 100
    }
  }

  if (update.payload === "poison") {
    pokemonToUpdate.health = Number(pokemonToUpdate.health) - 10
    if (pokemonToUpdate.health <= 0) {
      pokemonToUpdate.health = 0
    }
  }

  return pokemonToUpdate
}
