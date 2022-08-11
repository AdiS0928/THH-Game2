var express = require('express');
var app = express();
var path = require('path');

app.set('view engine','ejs');
require("./db/server");


var PORT = 3000;
const static_path = path.join(__dirname,"../client");
app.use(express.static(static_path));

app.get("/",(req,res) =>{
    res.send("working")
})

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);

});

 app.get("/leaderboard")


