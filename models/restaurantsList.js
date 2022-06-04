const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    default: ""
  },
  name_en: {
    type: String,
    required: true,
    default: ""
  },
  category: {
    type: String,
    required: true,
    default: ""
  },
  image: {
    type: String,
    required: true,
    default: ""
  },
  location: {
    type: String,
    required: true,
    default: ""
  },
  phone: {
    type: String,
    required: true,
    default: ""
  },
  google_map: {
    type: String,
    required: true,
    default: ""
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true,
    default: ""
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
// mongoose.model('CollectionName', SchemaName )
module.exports = mongoose.model('RestaurantList', restaurantSchema)