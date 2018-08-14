import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Pokemon from "./pokemon";


@Entity()
export default class Trainer extends BaseEntity{

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text')
    firstName: string

    @Column('text')
    lastName: string

    @Column('text')
    items: string

    @Column('text')
    imageTrainer: string

    @OneToMany(_ => Pokemon, pokemon => pokemon.trainer)
    pokemons: Pokemon[]

}