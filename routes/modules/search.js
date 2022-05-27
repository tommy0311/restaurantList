const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantsList')

const sortStringMap = {
	name:      "餐廳名稱：A → Z",
  name_desc: "餐廳名稱：Z → A",
  category:  "類別",
  location:  "地區",
}

const sortSqlMap = {
	name:      { name: 'asc' },
  name_desc: { name_desc: 'desc' },
  category:  { category: 'asc' },
  location:  { location: 'asc' },
}

router.get("/", (req, res) => {
	const keyword = req.query.keyword
  let sortQuery = req.query.sortQuery
  if(!sortQuery){
    sortQuery = 'name'
  }
	//console.log("search:", req.query)
	
	return RestaurantList.find( {$or: [
	  {"name": {"$regex": keyword, "$options": "i"}},
	  {"category": {"$regex": keyword, "$options": "i"}}]})
	  .lean()
    .sort(sortSqlMap[sortQuery])
	  .then(restaurants => res.render("index", { restaurants, keyword, sortQuery, sortString:sortStringMap[sortQuery] }))
	  .catch(error => {
	    console.log(error)
	    res.redirect('/')
	  })
});

module.exports = router