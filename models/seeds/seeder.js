const mongoose = require('mongoose')
const RestaurantList = require('../restaurantsList')
const { results: restaurants } = require('../../restaurant.json')

mongoose.connect(process.env.RESTAURANT_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!');

  for (let i = 0; i < restaurants.length ; i++) {
    RestaurantList.create(restaurants[i])
  }
  console.log('done')
})