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

type Status = "pending" | "started" | "finished"

type HitOrMIs = "hit" | "miss"

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column("char", { length: 1, default: "x" })
  turn: Symbol

  @Column("char", { length: 1, nullable: true })
  winner: Symbol

  @Column("text", { default: "pending" })
  status: Status

  @Column("text", { nullable: true })
  hitOrMiss: HitOrMIs

  @Column("text", { nullable: true })
  item: string

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
