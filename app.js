const express= require('express');
const app=express();
const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
// let user=[
//     {
//         id:1,
//         name:"Abhi",
//         age:100
//     },
//     {
//         id:2,
//         name:"Vishal",
//         age:1000
//     },
//     {
//         id:3,
//         name:"Alex",
//         age:400
//     }
// ];

//Mounting in express
const userRouter=require('./Routers/userRouter');
const authRouter=require('./Routers/authRouter');
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRouter');

app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/plan',planRouter);
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);

app.listen(5000);

