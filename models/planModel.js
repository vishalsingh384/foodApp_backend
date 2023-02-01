const mongoose=require('mongoose');
const {db_link}=require('../secrets');

mongoose.set('strictQuery',false);
mongoose.connect(db_link)
    .then(function(db){
        console.log("plan db connected");
        // console.log(db);
    })
    .catch(function (err){
        console.log(err);
    });


const planSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true, //custome message won't work here as it is handled by mongodb internally
        maxLength:[20 ,`plan name should not exceed 20 characters`]//this method is to show errors through schema
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true, 'price not entered']
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        }, 'discount cannot be 100%']
    },
    ratingsAverage:{
        type:Number
    },
    nor:{ //no of reviews
        type:Number,
        default:0
    }
});

//models                        //model_name    //on_which_schema
const planModel=mongoose.model("planModel",planSchema);
// A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

// (async function createPlan(){
//     let plan={
//         name:"Superfood",
//         duration:3,
//         price:9000,
//         ratingsAverage:3.8,
//         discount:10
//     }
//     let data=await planModel.create(plan);
//     console.log(data);
// })();

module.exports=planModel;
