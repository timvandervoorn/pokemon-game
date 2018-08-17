const fireAttacks = [
  {
    name: "Flamethrower",
    damage: 25
  },
  {
    name: "Ember",
    damage: 20
  },
  {
    name: "Bite",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const bugAttacks = [
  {
    name: "Toxic",
    damage: 25
  },
  {
    name: "Poison Sting",
    damage: 20
  },
  {
    name: "Quick Attack",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const waterAttacks = [
  {
    name: "Watergun",
    damage: 25
  },
  {
    name: "Bubble",
    damage: 20
  },
  {
    name: "Bite",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const normalAttacks = [
  {
    name: "Slam",
    damage: 25
  },
  {
    name: "Pound",
    damage: 20
  },
  {
    name: "Bite",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const groundAttacks = [
  {
    name: "Earthquake",
    damage: 25
  },
  {
    name: "Dig",
    damage: 20
  },
  {
    name: "Bite",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const grassAttacks = [
  {
    name: "Razor Leaf",
    damage: 25
  },
  {
    name: "Vine Whip",
    damage: 20
  },
  {
    name: "Bite",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const electricAttacks = [
  {
    name: "Thunder Bolt",
    damage: 25
  },
  {
    name: "Thunder Shock",
    damage: 20
  },
  {
    name: "Bite",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const flyingAttacks = [
  {
    name: "Fly",
    damage: 25
  },
  {
    name: "Gust",
    damage: 20
  },
  {
    name: "Peck",
    damage: 15
  },
  {
    name: "Tackle",
    damage: 10
  }
]

const cocoonAttacks = [
  {
    name: "Harden",
    damage: 25
  },
  {
    name: "Harden",
    damage: 20
  },
  {
    name: "Harden",
    damage: 15
  },
  {
    name: "Harden",
    damage: 10
  }
]

const pokemonDefaults = [
  {
    name: "Bulbasaur",
    type: "grass",
    attacks: grassAttacks
  },
  {
    name: "Caterpie",
    type: "bug",
    attacks: bugAttacks
  },
  {
    name: "Charizard",
    type: "fire",
    attacks: fireAttacks
  },
  {
    name: "Charmander",
    type: "fire",
    attacks: fireAttacks
  },
  {
    name: "Eevee",
    type: "normal",
    attacks: normalAttacks
  },
  {
    name: "Sandshrew",
    type: "normal",
    attacks: groundAttacks
  },
  {
    name: "Squirtle",
    type: "water",
    attacks: waterAttacks
  },
  {
    name: "Vaporeon",
    type: "normal",
    attacks: waterAttacks
  },
  {
    name: "Pikachu",
    type: "electric",
    attacks: electricAttacks
  },
  {
    name: "Pidgeot",
    type: "flying",
    attacks: flyingAttacks
  },
  {
    name: "Metapod",
    type: "bug",
    attacks: cocoonAttacks
  }
]

// const pokemonNames = [
//   "Bulbasaur",
//   "Caterpie",
//   "Charizard",
//   "Charmander",
//   "Eevee",
//   "Sandshrew",
//   "Squirtle",
//   "Vaporeon"
// ]

// const types = ["grass", "bug", "fire", "normal", "ground", "water"]

// const getType = name => {
//   if (name === "Charizard" || name === "Charmander") {
//     return "fire"
//   } else if (name === "Bulbasaur") {
//     return "grass"
//   } else if (name === "Caterpie") {
//     return "bug"
//   } else if (name === "Squirtle" || name === "Vaporeon") {
//     return "water"
//   } else if (name === "Sandshrew") {
//     return "ground"
//   } else if (name === "Eevee") {
//   }
// }

const generatePokemon = () =>
  pokemonDefaults[Math.floor(Math.random() * pokemonDefaults.length)]

export { generatePokemon }
