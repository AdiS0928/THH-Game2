var express = require('express');
var app = express();
const router = express.Router()
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;
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
var score = 0;

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
    NameData.save().then((movie) => {
        // console.log(movie.id);
        // name = movie.Name;
    }).catch(err => {
        res.status(400).send("unable to save to database");
      });
      name = NameData._id;
      res.render("game");
      
})

app.post("/leaderboard-post",async (req,res) =>{

    console.log(name)
    const doc = await Movie.findByIdAndUpdate({_id:name}, {$set: {Score:20}});
    res.redirect('/l')    
})

app.get("/l",(req,res) =>{
    // console.log(name)
    Movie.find({}, function(err, movies) {
        // console.log(name);
        // console.log(score);
        res.render('leaderboard', {
            moviesList: movies
        })
    })
})


app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);

});


