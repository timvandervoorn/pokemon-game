import {
  JsonController,
  Get,
  Patch,
  Param,
  Body,
  NotFoundError,
  Post,
  BodyParam
} from "routing-controllers"
import Pokemon from "../entities/pokemon"

@JsonController()
export default class PokemonController {
  
  @Get("/pokemon")
  async getPokemon() {
    const pokemon = await Pokemon.find()
    return { pokemon }
  }

  @Post("/pokemon")
  async newPokemon(
    @BodyParam("name", { required: true }) name: string,
    @BodyParam("type", { required: true }) type: string,
    @BodyParam("attacks", { required: true }) attacks: string[]
  ) {
    const pokemon = await Pokemon.create()
    pokemon.name = name
    pokemon.type = type
    pokemon.attacks = attacks
    return pokemon.save()
  }

  @Patch("/pokemon/:id")
  async updatePokemon(
    @Param("id") id: number,
    @Body() update: Partial<Pokemon>
  ) {
    const pokemon = await Pokemon.findOneById(id)
    if (!pokemon) {
      throw new NotFoundError(`Can't find pokemon!`)
    }
    const updatedPokemon = Pokemon.merge(pokemon, update)
    return updatedPokemon.save()
  }
}
