const planModel = require('../models/planModel');
const reviewModel=require('../models/reviewModel');
module.exports.getAllReviews=async function(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return res.json({
                msg:"all review retreived",
                reviews
            })
        }else{
            return res.json({
                msg:"reviews not found"
            });
        }
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.top3Reviews=async function(req,res){
    try{
        const top3=await reviewModel.find().sort({rating:-1}).limit(3);
        if(top3){
            return res.json({
                msg:"top3 reviews retreived",
                top3
            })
        }else{
            return res.json({
                msg:"reviews not found"
            });
        }
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.getPlanReview=async function(req,res){
    try{
        const planId=req.params.id;
        
        let reviews=await reviewModel.find();
       
        reviews=reviews.filter((review)=>{
            return review.plan["_id"].toString()==planId;
        })
        // console.log(reviews);
        if(reviews){
            return res.json({
                msg:"review retreived",
                reviews
            })
        }else{
            return res.json({
                msg:"reviews not found"
            });
        }
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.createReview=async function(req,res){
    try{
        // console.log(req);
        const planId=req.params.plan;
        // console.log(req);
        const plan=await planModel.findById(planId);
        const review=req.body;
        const postReview=await reviewModel.create(review);
        plan.ratingsAverage=(plan.ratingsAverage*plan.nor+req.body.rating)/(plan.nor+1);
        plan.nor+=1;
        await plan.save();
        await postReview.save();

        return res.json({
            msg:"review posted successfully",
            postReview
        });
    }
    catch(err){
        res.status(500).json({
            msg:err.message
        })
    }
}

module.exports.updateReview=async function(req,res){
    try{
        let planId=req.params.plan;//which plan's review is being updated
        let id=req.body.id;//which review needs to be updated
        let dataToBeUpdated=req.body;
        let keys=[];
        // let temp=0;
        for(let key in dataToBeUpdated){
            if(key==id)continue;
            keys.push(key);
        }
        //use review's rating to calculate avg rating and update in plan
        // if(keys.include("rating")){
        //     temp=keys["rating"];
        //     const plan=await planModel.findById(planId);
        //     plan.ratingsAverage=plan
        console.log("gg");
        let review=await reviewModel.findById(id);
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
        await review.save();
        return res.json({
            msg:"plan updated successfully",
            review
        });
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.deleteReview=async function(req,res){
    try{
        let planId=req.params.id;
        let id=req.body.id;

        //change avg rating of a plan
        let review=await reviewModel.findByIdAndDelete(id);
        res.json({
            message:"review is deleted",
        })
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}


