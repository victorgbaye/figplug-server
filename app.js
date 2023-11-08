require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

//other packages
const morgan = require('morgan')
const cookieParset = require('cookie-parser')

//database
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cookieParser = require('cookie-parser')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/',(req, res)=>{
    res.send('app is working')
})
// app.get('/api/v1',(req, res)=>{
//     console.log(req.cookies);
//     res.send('app is working')
// })
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000;
const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()