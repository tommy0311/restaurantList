const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantsList')

router.get("/", (req, res) => {
	const keyword = req.query.keyword
	return RestaurantList.find( {$or: [
	  {"name": {"$regex": keyword, "$options": "i"}},
	  {"category": {"$regex": keyword, "$options": "i"}}]})
	  .lean()
	  .then(restaurants => res.render("index", { restaurants, keyword }))
	  .catch(error => {
	    console.log(error)
	    res.redirect('/')
	  })
});

module.exports = router