const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantsList')

router.get('/new', (req, res) => {
	return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  let maxId = 1;
  return RestaurantList.findOne()
    .sort('-id')
    .lean()
    .then((lastRestaurant) => {
      if(lastRestaurant) {
        maxId = Number(lastRestaurant.id) + 1;
      }
    })
    .then(() => {
      const restaurant = {
        "id": maxId,
        "name": req.body.name,
        "name_en": req.body.name_en,
        "category": req.body.category,
        "image": req.body.image,
        "location": req.body.location,
        "phone": req.body.phone,
        "google_map": req.body.google_map,
        "rating": Number(req.body.rating),
        "description": req.body.description,
        "userId" : userId
      }

      //console.log("restaurant=" + JSON.stringify(restaurant))
      RestaurantList.create(restaurant)     
        .then(() => res.redirect('/')) 
        .catch(error => console.log(error))
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

router.get("/:id", (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return RestaurantList.findOne({ id, userId })
  .lean()
  .then(restaurant => res.render("show", { restaurant }))
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
});

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return RestaurantList.findOne({ id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = Number(req.params.id)
  return RestaurantList.findOne({ id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const id = Number(req.params.id)
  return RestaurantList.findOne({ id, userId })
    .then((restaurant) => {
      restaurant.name = req.body.name,
      restaurant.name_en = req.body.name_en,
      restaurant.category = req.body.category,
      restaurant.image = req.body.image,
      restaurant.location = req.body.location,
      restaurant.phone = req.body.phone,
      restaurant.google_map = req.body.google_map,
      restaurant.rating = Number(req.body.rating),
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

module.exports = router