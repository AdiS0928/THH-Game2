var express = require('express');
var app = express();
const router = express.Router()
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.set('view engine','ejs');
require("./db/server");

const moviesSchema = {
    User: String,
    Score: String
}

var name = "";

const Movie = mongoose.model('User', moviesSchema);
var PORT = 3000;
const static_path = path.join(__dirname,"../client");
app.use(express.static(static_path));

app.get("/",(req,res) =>{
    Movie.find({}, function(err, movies) {
        res.render("index");
    })
    
})

app.get("/name",(req,res) =>{
    res.render("name");
})

app.post("/game",(req,res) =>{

    const NameData = new Movie({User:req.body.Name,Score:0});
    console.log(req.body);
    NameData.save().then(() => {
       
    }).catch(err => {
        res.status(400).send("unable to save to database");
      });
      name = req.body.Name;
      res.render("game");
      
})

app.get("/leaderboard",(req,res) =>{
    Movie.find({}, function(err, movies) {
        console.log(name);
        res.render('leaderboard', {
            moviesList: movies
        })
    })
})

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);

});



