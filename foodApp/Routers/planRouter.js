const express=require('express');
const planRouter=express.Router();
const {protectRoute,isAuthorized}=require('../helper');
const {getAllPlans,getPlan,top3plans,createPlan,updatePlan,deletePlan}=require('../controller/planController');


planRouter
    .route('/all')
    .get(getAllPlans)

planRouter
    .route('/top3')
    .get(top3plans)

planRouter.use(protectRoute)//check logged in hai ya nahi
planRouter
    .route('single/:id')
    .get(getPlan)

planRouter.use(isAuthorized(['admin','restaurantowner']))//ye last me likha gaya hai. kyuki iske neeche saare route ko fir admin right chahiye hoga
planRouter
    .route('/crud')
    .post(createPlan)
   
planRouter
    .route('/crud/:id')
    .patch(updatePlan)
    .delete(deletePlan)


// planRouter
//     .route()
//     .get(top3Plans)

module.exports=planRouter; 