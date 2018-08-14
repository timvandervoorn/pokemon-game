import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Trainer from "./trainer";

@Entity()
export default class Pokemon extends BaseEntity{

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text')
    name: string

    @Column('text')
    type: string

    @Column('text')
    health: number = 100

    @Column('json')
    attacks: string[]

    @Column('text')
    imagePokemon: string = `../images/${this.name}.png`

    @ManyToOne(_ => Trainer, trainer => trainer.pokemons)
    trainer: Trainer;

}