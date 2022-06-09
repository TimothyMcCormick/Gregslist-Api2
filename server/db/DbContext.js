import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Car.js'
import { HouseSchema } from "../models/House";
import { JobSchema } from "../models/Job";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Cars = mongoose.model('Car', CarSchema)
  Account = mongoose.model('Account', AccountSchema);
  Houses = mongoose.model('House', HouseSchema)
  Jobs = mongoose.model('Job', JobSchema)
}

export const dbContext = new DbContext()
