const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')
const RestaurantList = require("./models/restaurantsList");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.RESTAURANT_MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}) 
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting the route and corresponding response
app.get("/", (req, res) => {
  return RestaurantList.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants: restaurants }))
    .catch(error => console.log(error))
});


app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return RestaurantList.findOne({ id: id })
  .lean()
  .then(restaurant => res.render("show", { restaurant: restaurant }))
  .catch(error => console.log(error))
});

/*
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = RestaurantList.filter((obj) => 
     ( obj.name.toLowerCase().includes(keyword.toLowerCase()) || 
     obj.category.toLowerCase().includes(keyword.toLowerCase())));

  res.render("index", {
    restaurants: restaurants,
    keyword: keyword,
  });
});*/

// localhost:3000 
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});