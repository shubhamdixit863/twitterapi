var express = require('express');
var router = express.Router();
let config =require("../config")
let twit = require('twit'); // importing twit package

let  twitter = new twit(config); //Object to be used for twiiter api
const mongoose=require('mongoose');
const User=require("../models/User");
const Twitter=require("../models/Tweets");
const jwt=require("jsonwebtoken");

/// redis config
let  redis = require('redis');
let client = redis.createClient(); // this creates a new client on default port
const asyncRedis = require("async-redis");
const asyncRedisClient = asyncRedis.decorate(client);

mongoose.connect("mongodb+srv://logan:logan@cluster0-zfsn8.mongodb.net/twitterapp?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected")
}).catch(err=>console.log(err));
/* GET home page. */

client.on('connect', function() {
  console.log('Redis client connected');
});

router.post('/login',async (req,res,next)=>{
 
  try{
    let user=await User.findOne({username:req.body.username});
    if(!user)
    {
      res.json({"messagae":"User Doesn't Exists"}).status(404);
    }
    else{
      // checking password here for user
      if(req.body.password==user.password)
      {
          // authentication success
          const token=jwt.sign({"username":user.username},"blackcat",{expiresIn:"1h"})
          res.json({"message":"Success","token":token,"user":user.username}).status(200);
    
      }
      else{
        res.json({"message":"Wrong Password or Username"}).status(401);
      }
    }
  }
  catch(err)
  {
    res.json(err);
  }
  
  
  

})


// posting staus on the twitter account
router.post('/poststatus', function(req, res, next) {
  twitter.post('statuses/update', { status: req.body.status }, function(err, data, response) {
    if(data)
    {
      res.json({"message":"tweeted"})
    }

    else if (err)
    {
      res.json({"message":"something went wrong"})
    }
  })
});

 
// searching tweets 


router.post("/searchtwitter",(req,res)=>{
   let searchword=req.body.searchword;
  let date=req.body.date; ///YYYY-MM-DD
 //let date="2019-01-01"

 /// searching in redis db before sending the request to twitter api

async function redisget()
{
  return  value = await client.get(searchword);

}


redisget().then((storeddata)=>{
 if(storeddata)
 {
   // if data exists in the redis database
   res.json(JSON.parse(storeddata));

 }
else{
  // calling the twitter api to fetch the data

    // calling twitter api 
    twitter.get('search/tweets', { q: `${searchword} since:${date}`, count: 10 }, function(err, data, response) {
      //  console.log("Data arrives",data);
        if(data)
        { 
    
    // saving the data in redis as well with the keyword
    
    async function redis()
    {
      await client.set(searchword, JSON.stringify(data));
    }
    redis(); // calling the function
          /// saving the data to mongodb as well before sending
    /*  let twitter=new Twitter({
        recentsearches:data,
        keyword:searchword
      })
    
    
      twitter.save(function (err, event) {
        if (err) return console.error(err);
        console.log(event._id + " saved to twitter collection.");
        res.json(data);
      });*/
      res.json(data);
        }
       else{
        res.json(err);
       }
    
      })

}

})
  

})


router.post("/recentsearches",async (req,res)=>{

try{
let data=await Twitter.find();
res.json({"data":data});
}

catch(e)
{
console.log(e);
}

})

module.exports = router;
