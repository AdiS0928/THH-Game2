var mongoose = require('mongoose');
require("dotenv").config();
var express = require('express');
const bodyParser =  require('body-parser')
absolutePath = 'C:/xampp/htdocs/sample/client'+ '/index.html' 


 

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb+srv://thhintern:Hotshotgamer2134@cluster0.zyzd6qa.mongodb.net/?retryWrites=true&w=majority').then(
    ()=> {
        console.log("i am connected");
    }
).catch(()=>{
    console.log("not connected");
});



// app.get('/',function (req,res){
//     res.sendFile(absolutePath)
// })
// app.listen(3000, function (){
//     console.log("yay working")
// })


// var User = require('./User');


// // Save();

// // async function Save ()
// // {
// //     var user = await User.create({User:"asisdf",Email:"dsfsfd"});
// //     console.log(user);
// // }

// // // get();

// // async function get ()
// // {
// //     var user = await User.findById("62d5aad11891799cacfe9e7a");
// //     console.log(user);
// // }

// app.post('/',function (req,res){
//     const user = new User({User:req.body.User,Email:req.body.Email});

//     user.save();
//     res.redirect('/')

    

// })
