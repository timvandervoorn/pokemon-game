export const baseUrl = "http://localhost:4000"

export const localStorageJwtKey = "currentUserJwt"

export const attack = "attack"
export const item = "item"
export const pokemon = "pokemon"
export const run = "run"

const trainers = [
  {
    id: 1,
    first_name: "Ash",
    last_name: "Ketchum",
    items: "Potion",
    image_trainer: "https://google.nl",
    pokemons: [
      {
        id: 1,
        name: "Venesaur",
        type: "grass",
        health: 100,
        attacks: [
          {
            name: "Vine Whip",
            damage: 20
          },
          {
            name: "Tackle",
            damage: 20
          },
          {
            name: "Razor Leaf",
            damage: 20
          },
          {
            name: "Bite",
            damage: 20
          }
        ],
        image_pokemon: "../images/venesaur.png",
        trainer_id: 1
      },
      {
        id: 2,
        name: "Blastoise",
        type: "water",
        health: 100,
        attacks: [
          {
            name: "Hydro pump",
            damage: 20
          },
          {
            name: "Tackle",
            damage: 20
          },
          {
            name: "Bubble",
            damage: 20
          },
          {
            name: "Bite",
            damage: 20
          }
        ],
        image_pokemon: "../images/blastoise.png",
        trainer_id: 1
      },
      {
        id: 3,
        name: "Charizard",
        type: "fire",
        health: 100,
        attacks: [
          {
            name: "Flamethrower",
            damage: 20
          },
          {
            name: "Tackle",
            damage: 20
          },
          {
            name: "Ember",
            damage: 20
          },
          {
            name: "Bite",
            damage: 20
          }
        ],
        image_pokemon: "../images/charizard.png",
        trainer_id: 2
      }
    ]
  },
  {
    id: 2,
    first_name: "Gary",
    last_name: "Oak",
    items: "Potion",
    image_trainer: "https://google.nl",
    pokemons: [
      {
        id: 1,
        name: "Bulbasaur",
        type: "grass",
        health: 100,
        attacks: [
          {
            name: "Vine Whip",
            damage: 20
          },
          {
            name: "Tackle",
            damage: 20
          },
          {
            name: "Razor Leaf",
            damage: 20
          },
          {
            name: "Bite",
            damage: 20
          }
        ],
        image_pokemon: "../images/venesaur.png",
        trainer_id: 2
      },
      {
        id: 2,
        name: "Squirtle",
        type: "water",
        health: 100,
        attacks: [
          {
            name: "Hydro pump",
            damage: 20
          },
          {
            name: "Tackle",
            damage: 20
          },
          {
            name: "Bubble",
            damage: 20
          },
          {
            name: "Bite",
            damage: 20
          }
        ],
        image_pokemon: "../images/blastoise.png",
        trainer_id: 2
      },
      {
        id: 3,
        name: "Charmander",
        type: "fire",
        health: 100,
        attacks: [
          {
            name: "Flamethrower",
            damage: 20
          },
          {
            name: "Tackle",
            damage: 20
          },
          {
            name: "Ember",
            damage: 20
          },
          {
            name: "Bite",
            damage: 20
          }
        ],
        image_pokemon: "../images/charmander.png",
        trainer_id: 2
      }
    ]
  }
]
