import { Player } from "./../games/entities"
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm"
import Trainer from "./trainer"

@Entity()
export default class Pokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text")
  name: string

  @Column("text")
  type: string

  @Column("text")
  health: number = 100

  @Column("json")
  attacks: {}

  @Column("text")
  imagePokemon: string = `../images/${this.name}.png`

  @ManyToOne(_ => Trainer, trainer => trainer.pokemons)
  trainer: Trainer

  @OneToMany(_ => Player, player => player.pokemon)
  player: Player

  //   @ManyToOne(_ => Player, player => player.pokemon)
  //   player: Player
}
