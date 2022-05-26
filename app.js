const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 

const RestaurantList = require("./models/restaurantsList");
const routes = require('./routes') // It is equal to require('./routes/index'

const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

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

// localhost:3000 
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});