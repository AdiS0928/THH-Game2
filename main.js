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

const admin = {
    Time: Number,
    User: String
}

var name = "";
var score = 0;
var user = "";
var time = 60;

const Movie = mongoose.model('User', moviesSchema);
const Admin = mongoose.model('admin', admin)
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

    Admin.find({}, function(err, admin) {
        console.log(admin);

        time = admin[0].Time;
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
      res.render("game",{time:time});
    });

    
      
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

app.get("/admin",(req,res) => {
    res.render("admin");
})

app.post("/settings",(req,res) => {
    var pass = req.body.pass;
    var username = req.body.Username;
    console.log(req.body)
    if(username =="THHADMIN" && pass =="W1R3L3SS"){
        Movie.find({"Score":{$ne : 0}}, function(err, movies) {
            // console.log(name);
            // console.log(score);
            res.render('setting', {
                moviesList: movies,
                scorea: score,
                usera:user
                
            })
        }).sort({Score : -1}).limit(5);
        // res.render("setting")
    }
    else{
        console.log(req.body)
        // res.redirect("/fail")
        res.render("admin")
        console.log("fail")
    }
    
})

app.post("/settings-update", async (req,res) => {
    console.log(req.body.timer)
    const doc = await Admin.findOneAndUpdate({User:"admin"}, {$set: {Time: req.body.timer}});
    res.redirect("/update") 
})

app.get("/update", (req,res) => {
    res.render("setting")
})

app.post("/delete", (req,res) =>{
    console.log(req.body.nameid)
    Movie.deleteOne({_id: req.body.nameid}, function(err,nam){
        Movie.find({"Score":{$ne : 0}}, function(err, movies) {
            // console.log(name);
            // console.log(score);
            res.render('setting', {
                moviesList: movies,
                scorea: score,
                usera:user
                
            })
        }).sort({Score : -1}).limit(5);
    });
    
})

app.post("/reset", (req,res) =>{
    console.log(req.body.nameid)
    Movie.deleteMany({}, function(err,nam){
        Movie.find({"Score":{$ne : 0}}, function(err, movies) {
            // console.log(name);
            // console.log(score);
            res.render('setting', {
                moviesList: movies,
                scorea: score,
                usera:user
                
            })
        }).sort({Score : -1}).limit(5);
    });
    
})


// app.get("/success",(req,res) =>{
//     res.render("settings")
// })

// app.get("/fail",(req,res) =>{
//     res.render("admin")
// })


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });



