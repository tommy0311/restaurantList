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
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
});

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  //console.log("body: ", req.body)
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  let maxId = 1;
  RestaurantList.findOne()
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
        "name": req.body.name || '',
        "name_en": req.body.name_en || '',
        "category": req.body.category || '',
        "image": req.body.image || '',
        "location": req.body.location || '',
        "phone": req.body.phone || '',
        "google_map": req.body.google_map || '',
        "rating": Number(req.body.rating) || 0,
        "description": req.body.description || ''
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

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const regexKeyword = "/^" + keyword + "$/i";
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

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return RestaurantList.findOne({ id })
  .lean()
  .then(restaurant => res.render("show", { restaurant }))
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
});

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return RestaurantList.findOne({ id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  return RestaurantList.findOne({ id })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

// localhost:3000 
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});