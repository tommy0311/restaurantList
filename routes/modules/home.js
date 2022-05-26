const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantsList')

router.get("/", (req, res) => {
	return RestaurantList.find()
	  .lean()
	  .then(restaurants => res.render("index", { restaurants }))
	  .catch(error => console.log(error))
});

module.exports = router