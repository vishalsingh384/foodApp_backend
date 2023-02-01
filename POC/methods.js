const express= require('express');
const { update, filter } = require('lodash');
const app=express();
app.use(express.json());
let user=[
    {
        id:1,
        name:"Abhi",
        age:100
    },
    {
        id:2,
        name:"Vishal",
        age:1000
    },
    {
        id:3,
        name:"Alex",
        age:400
    }
];

// app.get('/user',(req,res)=>{
//     res.send(user);
// })

// app.post('/user',(req,res)=>{
//     console.log(req.body) ;
//     user=req.body;
//     res.json({
//         message:"data received successufully",
//         user:req.body,
//     })
// })

// app.patch('/user',(req,res)=>{
    // console.log(req.body);
    // let updatedData=req.body;
    // for(key in updatedData){
    //     user[key]=updatedData[key];
    // }
    // res.json({
    //     message:"data updated succesfully",
    // })
// })

// app.delete('/user',(req,res)=>{
    // user={};
    // res.json({
    //     message:"data deleted successfully"
    // })
// })

// //params
// app.get('/user/:id',(req,res)=>{
    // console.log(req.params);
    // // let {id}=req.params;
    // // let user=db.findOne(id);
    // res.send({"msg":"user id is","obj":req.params});
// })


// //query
// app.get('/users',(req,res)=>{
//     console.log(req.query);
//     let{name,age}=req.query;
//     // console.log(name+"-"+age);
//     let filteredData=user.filter(userObj=>{
//         return userObj.name==name&&userObj.age==age;
//     })
//     res.send(filteredData);
// })



//Mounting in express
const userRouter=express.Router();

app.use('/user',userRouter);

userRouter
    .route("/")
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/:id")
    .get(getUserById)



    
function getUser(req,res){
    res.send(user);
}

function postUser(req,res){
        console.log(req.body) ;
    user=req.body;
    res.json({
        message:"data received successufully",
        user:req.body,
    })
}

function updateUser(req,res){
    console.log(req.body);
    let updatedData=req.body;
    for(key in updatedData){
        user[key]=updatedData[key];
    }
    res.json({
        message:"data updated succesfully",
    })
}

function deleteUser(req,res){
    user={};
    res.json({
        message:"data deleted successfully"
    })
}

function getUserById(req,res){
    console.log(req.params);
    // let {id}=req.params;
    // let user=db.findOne(id);
    res.send({"msg":"user id is","obj":req.params});
}

app.listen(5000);