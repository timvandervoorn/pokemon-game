import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch
} from "routing-controllers"
import User from "../users/entity"
import { Game, Player } from "./entities"
import { checkMove, checkWinner } from "./logic"
import { generatePokemon } from "../lib/constants"
import { io } from "../index"
import Pokemon from "../entities/pokemon"

@JsonController()
export default class GameController {
  @Authorized()
  @Post("/games")
  @HttpCode(201)
  async createGame(@CurrentUser() user: User) {
    const entity = await Game.create().save()
    const randomPokemon = generatePokemon()
    const pokemon = await Pokemon.create({
      name: randomPokemon.name,
      type: randomPokemon.type,
      attacks: randomPokemon.attacks
    }).save()

    await Player.create({
      game: entity,
      user,
      symbol: "x",
      pokemon
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit("action", {
      type: "ADD_GAME",
      payload: game
    })

    return game
  }

  @Authorized()
  @Post("/games/:id([0-9]+)/players")
  @HttpCode(201)
  async joinGame(@CurrentUser() user: User, @Param("id") gameId: number) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== "pending")
      throw new BadRequestError(`Game is already started`)
    game.status = "started"
    await game.save()

    const randomPokemon = generatePokemon()

    const pokemon = await Pokemon.create({
      name: randomPokemon.name,
      type: randomPokemon.type,
      attacks: randomPokemon.attacks
    }).save()

    const player = await Player.create({
      game,
      user,
      symbol: "o",
      pokemon
    }).save()

    io.emit("action", {
      type: "UPDATE_GAME",
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  @Patch("/games/:id([0-9]+)")
  async updateGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update
  ) {
    const pokemonToUpdate = await Pokemon.findOneById(update.opponentPokemonId)

    if (!pokemonToUpdate) {
      throw new NotFoundError(`Can't find pokemon!`)
    }

    console.log(update)

    const previousHealth = pokemonToUpdate.health

    const pokemon = await checkMove(pokemonToUpdate, update)

    await pokemon.save()

    const game = await Game.findOneById(gameId)

    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== "started")
      throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn)
      throw new BadRequestError(`It's not your turn`)

    if (previousHealth === pokemon.health) {
      game.hitOrMiss = "miss"
    } else {
      game.hitOrMiss = "hit"
    }

    game.item = update.payload

    game.turn = player.symbol === "x" ? "o" : "x"

    const winner = checkWinner(pokemon, player)

    if (winner) {
      game.winner = winner
      game.status = "finished"
    }

    await game.save()

    io.emit("action", {
      type: "UPDATE_GAME",
      payload: game
    })
  }

  @Authorized()
  @Get("/games/:id([0-9]+)")
  getGame(@Param("id") id: number) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get("/games")
  getGames() {
    return Game.find()
  }
}
