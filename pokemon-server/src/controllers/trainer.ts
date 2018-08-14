import {
  JsonController,
  Get,
  Patch,
  Param,
  Body,
  NotFoundError
} from "routing-controllers"
import Trainer from "../entities/trainer"

@JsonController()
export default class TrainerController {
  @Get("/trainer")
  async getTrainer() {
    const trainer = await Trainer.find()
    return { trainer }
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
