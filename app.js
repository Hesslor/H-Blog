//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Email: hesslorlucian%8@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const posts = [];

app.get("/", function(req,res){

  res.render("home",{
    staringContent: homeStartingContent,
    posts: posts
  });

});

app.get("/about", function(req,res){

  res.render("about",{aboutContent: aboutContent});
});

app.get("/contact", function(req,res){

  res.render("contact",{contactContent: contactContent});
});

app.get("/compose", function(req,res){

  res.render("compose");
});

app.post("/compose", function(req,res){

  const post = {
    Title: req.body.contentTitle,
    Body: req.body.contentBody
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:name", function(req,res){
  const requestedTitle = _.lowerCase(req.params.name);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.Title);

    if(storedTitle === requestedTitle) {
      res.render("post", {
        Title: post.Title,
        Body: post.Body
      });
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});