const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const RestaurantList = require('../restaurantsList')
const { results: restaurants } = require('../../restaurant.json')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  idMap: [ 1, 2, 3 ]
}

const SEED_USER2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  idMap: [ 4, 5, 6 ]
}

const SEED_USERS = [ SEED_USER1, SEED_USER2 ]

db.once('open', () => {
  let finish = []
  new Promise((resolve, _reject) => {
    for (const [index, seed] of SEED_USERS.entries()) {
      bcrypt
      .genSalt(10)
      .then(salt => {
        return bcrypt.hash(seed.password, salt)
      })
      .then(hash => { 
            return User.create({
              name: seed.name,
              email: seed.email,
              password: hash})
          }
      )
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: seed.idMap.length },
          (_, i) => {
            const result = restaurants.filter(obj => Number(obj.id) === seed.idMap[i])
            if( result.length != 1) {
              //resolve()
            }
            result[0].userId = userId
            return RestaurantList.create(result[0])
          }
        ))
      })
      .then(() => {
        finish.push( index )
        if (finish.length == SEED_USERS.length) {
          resolve()
        }
      })
      .catch( error=> console.log(error) )
    }
  })
  .then(() => {
    process.exit()
  })
})