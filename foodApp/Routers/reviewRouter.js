const express=require("express");
const reviewRouter=express.Router();
const {isAuthorized,protectRoute}=require('../helper');
const {getAllReviews,top3Reviews,getPlanReview,createReview,updateReview,deleteReview}=require('../controller/reviewController');

reviewRouter
    .route('/all')
    .get(getAllReviews);

reviewRouter
    .route('/top3')
    .get(top3Reviews); 
 
//plan ka id jaayega. reviews pe loop lagake plan dhundna hai  
reviewRouter
    .route('/:id')
    .get(getPlanReview);

reviewRouter.use(protectRoute)    
reviewRouter
    .route('/crud/:plan')
    .post(createReview) 
    .patch(updateReview)
    .delete(deleteReview)  
    
    
module.exports=reviewRouter;    
