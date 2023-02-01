const planModel=require('../models/planModel');

module.exports.getAllPlans=async function(req,res){
    try{
        let plans=await planModel.find();
        if(plans){
            return res.json({
                msg:"all plans retreived",
                data:plans
            })
        }else{
            return res.json({
                msg:"plans not found"
            })
        }
    }
    catch(err){
        res.json({
            msg:err.message
        });  
    }
}

module.exports.getPlan=function(req,res){
    try{
        let id=req.params.id;
        let plan=planModel.findById(id);
        if(plan){
            return res.json({
                msg:"plan retreived",
                data:plan
            })
        }else{
            return res.json({
                msg:"plan not found"
            })
        }
    }
    catch(err){
        req.json({
            msg:err.message
        });  
    }
}

module.exports.createPlan=async function(req,res){
    try{
        let plan=req.body;
        let createdPlan=await planModel.create(plan);
            return res.json({
                msg:"plan created successfully",
                createdPlan
            })
        }
    catch(err){
        req.json({
            msg:err.message
        });  
    }
}

module.exports.deletePlan=async function(req,res){
    try{
        let id=req.params.id; 
        let deletedPlan=await planModel.findByIdAndDelete(id);
        return res.json({
            msg:"plan deleted successfully",
            data:deletedPlan
        })
    }
    catch(err){
        req.json({
            msg:err.message
        });  
    }
}

module.exports.updatePlan=async function(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }

        let plan=await planModel.findById(id);
        for(let i=0;i<keys.length;i++){
            plan[keys[i]]=dataToBeUpdated[keys[i]];
        }
        await plan.save();
        return res.json({
            msg:"plan updated successfully",
            plan
        })
    }
    catch(err){
        res.json({
            msg:err.message
        })
    }
}

module.exports.top3plans=async function(req,res){
    try{
        const plans=await planModel.find().sort({ratingsAverage:-1}).limit(3);//-1 indicates descending order while 1 indicates ascending order
        res.json({
            msg:"top 3 plans",
            data:plans
        })
    }
    catch(err){
        req.json({
            msg:err.message
        });  
    }
}