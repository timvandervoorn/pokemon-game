import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne
} from "typeorm"
import User from "../users/entity"
import Pokemon from "../entities/pokemon"

export type Symbol = "x" | "o"
export type Row = [Symbol | null, Symbol | null, Symbol | null]
export type Board = [Row, Row, Row]

type Status = "pending" | "started" | "finished"

const emptyRow: Row = [null, null, null]
const emptyBoard: Board = [emptyRow, emptyRow, emptyRow]

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

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column("json", { default: emptyBoard })
  board: Board

  @Column("char", { length: 1, default: "x" })
  turn: Symbol

  @Column("char", { length: 1, nullable: true })
  winner: Symbol

  @Column("text", { default: "pending" })
  status: Status

  // @Column("json", { default: trainers })
  // trainers: string[]

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]
}

@Entity()
@Index(["game", "user", "symbol"], { unique: true })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @ManyToOne(_ => Pokemon, pokemon => pokemon, { eager: true })
  pokemon: Pokemon

  @Column("char", { length: 1 })
  symbol: Symbol
}
