const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//user for session cookie
const session = require('express-session');

const passport = require('passport')

const passportLocal = require('./config/passport-local-strategy');
//const { MongoStore } = require('connect-mongo');

//used to store sessions of the cookies into mongostore
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({

    src:'/assets/scss',
    dest:'/assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongostore is used to store the session cookie in the db

app.use(session({
    name: 'codeial',//name of the cookie
    ///to do chaange the secret before deployment in production mode
    secret: "balsomething",
    saveUninitialized:false,
    resave : false,
    cookie:{
        maxAge: (1000*60*100)

    },
    store:new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

