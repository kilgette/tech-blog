const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("handlebars-helpers")(); // Load all handlebars helpers

const routes = require("./controllers");
const sequelize = require("./config/connection");
const authenticate = require("./utils/authenticate");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "shhhh! secret",
  resave: false,
  cookie: { maxAge: 1000000 },
  saveUninitialized: false,
};

app.use(session(sess));

const hbs = exphbs.create({
  helpers: { compare: helpers.comparison().compare },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Server is now listening on port", PORT));
});