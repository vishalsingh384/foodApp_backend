const mongoose=require('mongoose');
const {db_link}=require('../secrets');

mongoose.set('strictQuery',false);
mongoose.connect(db_link)
    .then(function(db){
        console.log("review db connected");
    })
    .catch(function (err){
        console.log(err);
    });

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel",
        required:[true,"review must belong to a user"],
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:"planModel",
        required:[true,"plan must belong to a user"]
    }
});

//find findbyid  findone findbyidandupdate
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user', //kaha fill karna hai
        select:"name profileImage"  //kya fill karna hai(sace seperated hota hai ,comma nahi)
    }).populate('plan');//mujhe plan me sabkuch dalwana hai planModel ka, isliye direct aise likh sakte
    next();
})


const reviewModel=mongoose.model("reviewModel",reviewSchema);

module.exports=reviewModel;

