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
import Trainer from "../entities/trainer"

@JsonController()
export default class TrainerController {
  
  @Get("/trainer")
  async getTrainer() {
    const trainer = await Trainer.find()
    return { trainer }
  }

  @Post("/trainer")
  async newPokemon(
    @BodyParam("firstName", { required: true }) firstName: string,
    @BodyParam("lastName", { required: true }) lastName: string,
  ) {
    const trainer = await Trainer.create()
    trainer.firstName = firstName
    trainer.lastName = lastName
    return trainer.save()
  }

  @Patch("/trainer/:id")
  async updateTrainer(
    @Param("id") id: number,
    @Body() update: Partial<Trainer>
  ) {
    const trainer = await Trainer.findOneById(id)
    if (!trainer) {
      throw new NotFoundError(`Can't find trainer!`)
    }
    const updatedTrainer = Trainer.merge(trainer, update)
    return updatedTrainer.save()
  }
}
