var express = require('express');
var app = express();
const router = express.Router()
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;
require("dotenv").config();
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.set('view engine','ejs');
require("./db/server");

const moviesSchema = {
    User: String,
    Score: Number
}

var name = "";
var score = 0;
var user = "";

const Movie = mongoose.model('User', moviesSchema);
var PORT = process.env.PORT || 3000;
const static_path = path.join(__dirname);
app.use(express.static(static_path));

app.get("/",(req,res) =>{
        res.render("index");
    
})


app.get("/name",(req,res) =>{
    res.render("name");
})

app.post("/game",(req,res) =>{

    const NameData = new Movie({User:req.body.Name,Score:0});
    console.log(req.body);
    NameData.save().then((movie) => {
        // console.log(movie.id);
        // name = movie.Name;
    }).catch(err => {
        res.status(400).send("unable to save to database");
      });
      name = NameData._id;
      user = NameData.User;
      res.render("game");
      
})

app.post("/leader",async (req,res) => {
    score = req.body.s;
    console.log(score);
    console.log(name)
    const doc = await Movie.findByIdAndUpdate({_id:name}, {$set: {Score: score}});
    res.redirect('/l')    
})

app.get("/leader-l",(req,res) => {
    Movie.find({"Score":{$ne : 0}}, function(err, movies) {
        // console.log(name);
        // console.log(score);
        res.render('lostleaderboard', {
            moviesList: movies,
            scorea: score,
            usera:user
        })
    }).sort({Score : -1}).limit(5);
})


app.get("/l",(req,res) =>{
    // console.log(name)
    Movie.find({"Score":{$ne : 0}}, function(err, movies) {
        // console.log(name);
        // console.log(score);
        res.render('leaderboard', {
            moviesList: movies,
            scorea: score,
            usera:user
        })
    }).sort({Score : -1}).limit(5);
})

app.get("/loser",(req,res) =>{
    res.render("lostleaderboard");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });



