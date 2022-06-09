import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const JobSchema = new Schema({
  company: {type: String, required: true},
  jobTitle: {type: String, required: true},
  hours: {type: Number, required: true, default: 40},
  rate: {type: Number, required: true, default: 15},
  description: {type: String, default: "None"},
  creatorId: {type: Schema.Types.ObjectId, ref: 'Account'}
}, {timestamps: true, toJSON: {virtuals:true} })



JobSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})