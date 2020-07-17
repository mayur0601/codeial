const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// const { serializeUser } = require('passport');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email,password,done){
    //find the user and establish the identity
    User.findOne({
        email:email
},function(err,user){
    if(err){
        console.log('error in findning the user ---> Passport');
        return done(err);
    }
    if(!user || user.password!=password){
        console.log('Invalid username or password');
        // done(return element, authentication status);
        return done(null,false);
    }
    return done(null,user);
});
}));

//serializing the user to decide which key is to keep in the cookie

//encryption
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//decryption
//deserializing  the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        return done(null,user);
    })
});

// check if user is authenticated 
passport.checkAuthentication = function(req,res,next){
    // if user is sign in , then pass on the request to the next function 
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not sign in 
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain current sign in user from the session cookie and we are ust sending this to the locals for the view
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
