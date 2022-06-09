import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"




class JobsService{
  
  async getAll(query = {}) {
    return await dbContext.Jobs.find(query).populate('creator', 'name picture')
  }
  async getById(id) {
    const job = await dbContext.Jobs.findById(id).populate('creator', 'name picture')
    if (!job){
      throw new BadRequest('Invalid Job Id')
    }
    return job
  }
  async create(body) {
    const job = await dbContext.Jobs.create(body)
    return job
  }
  async edit(update) {
    let original = await this.getById(update.id)
    if (original.creatorId.toString() != update.creatorId) {
      throw new Forbidden ("You cannot edit a job you didn't post")
    }

    original.company = update.company || original.company
    original.jobTitle = update.jobTitle || original.jobTitle
    original.hours = update.hours || original.hours
    original.rate = update.rate || original.rate
    original.description = update.description || original.description

    await original.save()

    return original
  }
  async remove(id, userId) {
    const job = await this.getById(id)
    if (job.creatorId.toString() != userId) {
      throw new Forbidden ("Thats not your job post to delete")
    }
    await job.remove()
  }

}


export const jobsService = new JobsService()