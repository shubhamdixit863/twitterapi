const mongoose=require('mongoose');
const TweetsSchema=mongoose.Schema({
  recentsearches:{},
  keyword:String,
  
    
})

module.exports=mongoose.model('Tweet',TweetsSchema);