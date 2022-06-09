import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";




export class HousesController extends BaseController {
  constructor(){
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      logger.log("[QUERY]", req.query)
      const houses = await housesService.getAll(req.query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const house = await housesService.getById(req.params.id)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const house = await housesService.create(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const house = await housesService.edit(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await housesService.remove(req.params.id, req.userInfo.id)
      return res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
  
  
  
}