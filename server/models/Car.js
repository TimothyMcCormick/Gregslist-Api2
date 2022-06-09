import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true, min: 1950, max: new Date().getFullYear() + 2 },
  price: { type: Number, required: true, min: 1 },
  description: { type: String, default: "No Description Provided" },
  imgUrl: { type: String, default: "http://placekitten.com/200/300" },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })


// VIRTUAL is a fake property ("get")
// not stored in the database
CarSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})