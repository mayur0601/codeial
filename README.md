# codeial

1. install nodejs
2. run first server using http module
3 .do some functioning
4. studying about web architecture
5. serving responce to browser / html/txt
6. install nodemon , Automatic server restart
7. extending multiple pages from url
8. use express as backend framework to run server
9. express framework is also used to watch on all MVC directory structure
10. returning responce from the server
11. Http requests, (get, post, delete, put)
12. use template engine to make a wepage dynamic
13. install and import ejs template engine into the project
14. 




1




// passport

installation - 
    npm install passport
    npm install passport-local

import - import passport
    const LocalStrategy = require('passport-local').Strategy;

    crate midleware for passport into models directory
    and check for the valid user, then call serialized middleware 
    where we encrypt a key and a store into the cookie in browser.

    then, 

    in deserialized we decode the encrypted key and check for the user is authenticated or not



. when server is restared all cookies are deleted and user become logout., so we need to store than cookie somewhere so user cannot logged out after restarting an server.

for that we are going to use mongo store

install -  npm install connect-mongo







sass and acss

install - npm install node-sass-middleware


