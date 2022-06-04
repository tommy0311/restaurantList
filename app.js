const express = require("express");
const session = require('express-session')
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const flash = require('connect-flash')  

const routes = require('./routes') // It is equal to require('./routes/index')
require('./config/mongoose')
const usePassport = require('./config/passport')

const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// setting static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

// localhost:3000 
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});