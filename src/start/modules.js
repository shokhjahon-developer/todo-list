require("dotenv/config");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const homeRender = require("../home/home.render");



const modules = async (app, express) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
  app.use(cookie());
  app.use(cors());
  app.use(fileUpload());
  app.use("/", homeRender);

 

  app.use("/*", (req, res) => {
    res.render("error/error.ejs");
  });
};

module.exports = modules;


