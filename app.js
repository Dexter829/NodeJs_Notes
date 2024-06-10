 require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./servers/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const OAuth2Strategy = require('passport-oauth2');

const app = express();
const port = process.env.PORT || 5000; // Prioritize the environment variable


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store : MongoStore.create({
        mongoUrl:process.env.MONGODB_URI 
    }),
    //cookie:{ maxAge: new Date(Date.now() + (3600000))}
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//Connect to the Database
connectDB()

// Static Files
app.use(express.static('public'));


// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main'); // Adjust the layout path if necessary
app.set('view engine', 'ejs');

// Routes
app.use('/',require('./servers/routes/auth'));
app.use('/',require('./servers/routes/index'));
app.use('/',require('./servers/routes/dashboard'));


//Handle 404
app.get('*',function(req , res){
    // res.status(404).send('404 Page Not Found.')
    res.status(404).render('404')

})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

