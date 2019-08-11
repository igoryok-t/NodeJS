const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore =  require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/course')
const ordersRoutes = require('./routes/orders')
const authRouter = require('./routes/auth')
const User = require('./models/user')
const varMidelware = require('./middlleware/variables')
const userMidelware = require('./middlleware/user')


const MONGODB_URI = `mongodb+srv://admin:qJo2UybZs5hDdDPd@cluster0-12zri.mongodb.net/shop`

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

// app.use(async (req,res,next)=> {
//     try{
//         const user = await User.findById('5d2c9c4e9deae914e045f7f3')
//         req.user = user
//         next()
        
//     }catch(e){
//         console.log(e)
//     }
// })

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'dfsdfsd fdvsd',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(varMidelware) 
app.use(userMidelware) 

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/course', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRouter)


const PORT = process.env.PORT || 3000

//const url = `mongodb+srv://admin:qJo2UybZs5hDdDPd@cluster0-12zri.mongodb.net/test?retryWrites=true&w=majority`

async function start() {
    try{
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        // const candidate = await User.findOne()
        // if(!candidate){
        //     const user = new User ({
        //         email: 'admin.admin.com',
        //         name: 'Admin',
        //         cart: {items: []}
        //     })
        //     await user.save()
        // }
        app.listen(PORT, () =>{
            console.log (`Server is running on port ${PORT}`)
        })

    }catch(e){
        console.log(e)
    }
}

start()


