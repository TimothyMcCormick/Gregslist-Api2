import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"



class HousesService{
  
  async getAll(query = {}) {
    return await dbContext.Houses.find(query).populate('creator', 'name picture')
  }

  async getById(id) {
    const house = await dbContext.Houses.findById(id).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('Invalid House Id')
    }
    return house
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }

  async edit(update) {
    let original = await this.getById(update.id)

    if(original.creatorId.toString() != update.creatorId) {
      throw new Forbidden("You cannot edit a house you didn't post")
    }

    original.bedrooms = update.bedrooms || original.bedrooms
    original.bathrooms = update.bathrooms || original.bathrooms
    original.levels = update.levels || original.levels
    original.imgUrl = update.imgUrl || original.imgUrl
    original.year = update.year || original.year
    original.price = update.price || original.price
    original.description = update.description || original.description

    await original.save()

    return original
  }

  async remove(id, userId) {
    const house = await this.getById(id)
    if (house.creatorId.toString() != userId) {
      throw new Forbidden('Not your house to delete')
    }
    await house.remove()
  }

}

export const housesService = new HousesService()