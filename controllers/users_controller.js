const User = require('../models/user');


module.exports.profile = function(req, res){
    // if (req.cookies.user_id){
    //     User.findById(req.cookies.user_id, function(err, user){
    //         if (user){
    //             return res.render('user_profile', {
    //                 title: "User Profile",
    //                 user: user
    //             })
    //         }else{
    //             return res.redirect('/users/sign-in');

    //         }
    //     });
    // }else{
    //     return res.redirect('/users/sign-in');

    // }
    return res.render('user_profile', {
        title: 'User Profile',
    })
    
}

module.exports.signOut = function(req,res){
    // res.cookie('codeial',null);
    req.logout();
    return res.redirect('/');
}


// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    console.log(req.body);
    if (req.body.password != req.body.c_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up',err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        } 

    });
}
//error is here ok bro sign in ni ho rha ??
//yes sign in hone ke bad it should come to this createSession and show the home page
module.exports.createSession = function(req,res){
    return res.redirect('/');
}



// sign in and create a session for the user
// module.exports.createSession = function(req, res){


    // return res.redirect('/');

 
    // steps to authenticate
    // find the user
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing in'); return}
    //     // handle user found
    //     if (user){

    //         // handle password which doesn't match
    //         if (user.password != req.body.password){
    //             return res.redirect('back');
    //         }

    //         // handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile');

    //     }else{
    //         // handle user not found

    //         return res.redirect('back');
    //     }


    // });


    // // using passport-

    

    
// }

