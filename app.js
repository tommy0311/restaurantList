const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

// setting the route and corresponding response
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (obj) => obj.id.toString() === req.params.id
  );
  res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((obj) => 
     ( obj.name.toLowerCase().includes(keyword.toLowerCase()) || 
     obj.category.toLowerCase().includes(keyword.toLowerCase())));

  res.render("index", {
    restaurants: restaurants,
    keyword: keyword,
  });
});

// localhost:3000 
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});