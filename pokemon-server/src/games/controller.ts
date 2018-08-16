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
import { Game, Player, Board } from "./entities"
// import { IsBoard, isValidTransition, calculateWinner, finished } from "./logic"
// import { Validate } from "class-validator"
import { io } from "../index"
import Pokemon from "../entities/pokemon"

// class GameUpdate {
//   @Validate(IsBoard, {
//     message: "Not a valid board"
//   })
//   board: Board
// }

class PokemonUpdate {
  move: string
  payload: {
    name: string
    damage: number
  }
  opponentPokemonId: number
}

@JsonController()
export default class GameController {
  @Authorized()
  @Post("/games")
  @HttpCode(201)
  async createGame(@CurrentUser() user: User) {
    const entity = await Game.create().save()

    // const pokemon = await Pokemon.create({
    //   name: "Bulbasaur",
    //   type: "grass",
    //   health: 100,
    //   attacks: [],
    //   imagePokemon: "bla"
    // }).save()
    const pokemon = await Pokemon.findOneById(1)

    console.log(pokemon)
    await Player.create({
      game: entity,
      user,
      symbol: "x",
      pokemon
    }).save()

    const game = await Game.findOneById(entity.id)

    console.log(game)

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

    const pokemon = await Pokemon.findOneById(2)

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

  // @Authorized()
  // // the reason that we're using patch here is because this request is not idempotent
  // // http://restcookbook.com/HTTP%20Methods/idempotency/
  // // try to fire the same requests twice, see what happens
  // @Patch("/games/:id([0-9]+)")
  // async updateGame(
  //   @CurrentUser() user: User,
  //   @Param("id") gameId: number,
  //   @Body() update
  // ) {
  //   console.log(update)
  //   const game = await Game.findOneById(gameId)
  //   if (!game) throw new NotFoundError(`Game does not exist`)

  //   const player = await Player.findOne({ user, game })

  //   if (!player) throw new ForbiddenError(`You are not part of this game`)
  //   if (game.status !== "started")
  //     throw new BadRequestError(`The game is not started yet`)
  //   if (player.symbol !== game.turn)
  //     throw new BadRequestError(`It's not your turn`)
  //   if (!isValidTransition(player.symbol, game.board, update.board)) {
  //     throw new BadRequestError(`Invalid move`)
  //   }

  //   const winner = calculateWinner(update.board)
  //   if (winner) {
  //     game.winner = winner
  //     game.status = "finished"
  //   } else if (finished(update.board)) {
  //     game.status = "finished"
  //   } else {
  //     game.turn = player.symbol === "x" ? "o" : "x"
  //   }
  //   game.board = update.board
  //   await game.save()

  //   io.emit("action", {
  //     type: "UPDATE_GAME",
  //     payload: game
  //   })

  //   return game
  // }

  @Authorized()
  @Patch("/games/:id([0-9]+)")
  async updateGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() update: PokemonUpdate
  ) {
    const pokemonToUpdate = await Pokemon.findOneById(update.opponentPokemonId)

    if (!pokemonToUpdate) {
      throw new NotFoundError(`Can't find pokemon!`)
    }

    if (pokemonToUpdate) {
      pokemonToUpdate.health = pokemonToUpdate.health - update.payload.damage
      await pokemonToUpdate.save()
    }

    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== "started")
      throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn)
      throw new BadRequestError(`It's not your turn`)

    game.turn = player.symbol === "x" ? "o" : "x"
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
