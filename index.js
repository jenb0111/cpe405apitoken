var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
//var data = require('./users');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// var config = require('./config');
var port = process.env.PORT || 5000;
// var hostname = config.hostname;
var apiRoutes = express.Router(); 
// var Users = require('./controllers/userController.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(morgan('dev'));

// mongoose.connect(config.database);

//homework
const http = require("http")
const MongoClient = require("mongodb").MongoClient

const uri = "mongodb://jennb0111:1110bnnej@ds249575.mlab.com:49575/customerlist"

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// // Slide 15
// //var db = mongojs('mongodb://jennb0111:1110bnnej@ds249575.mlab.com:49575/customerlist', ['main']);
// // https://api.mlab.com/api/1/databases?apiKey=icHoJ5P87lgQAY9VXbOwfRxKtzNaEIGQ //complete resource url

//Homework
const db = MongoClient.connect(uri, (err, db) => {
  if(err){
      console.log(err)
      console.log("Connection Error!!!")
  }else{
    app.get('/', (req, res) => {
        // res.send('Root URL')
        db.collection("main").find({}).toArray((err, result) => {
            res.render('index', {
                title: "Cusromer Lists: ",
                users: result
            });
        })
        
    });

    app.get('/user', function (req, res) {
        db.collection('main').find({}).toArray((err, result) => {
            res.json(result)
        })
    });
    
    app.post('/user/', function(req, res) {
        var newUser = {
            id: req.body.id,
            name: req.body.name,
            age: parseInt(req.body.age),
            email: req.body.email
        }
        db.collection("main").insert(newUser, (err, result) => {
            res.redirect('/')
        })
    });

    app.get('/user/:id', (req, res) => {

        db.collection("main").find({'id': req.params.id}).toArray((err, result) => {
            res.json(result)
        })
        
    });

    app.put('/user/:id',(req, res) => {

        db.collection('main').findAndModify(
            {
                id: req.params.id
            },
            [['_id','asc']],
            {
                $set: {
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email
                }
            },
            { new: true }
        , (err, result, lastErrorObject) => {
            res.send('Updated!')
        });
    });

    app.delete('/user/:id', (req, res) => {
        db.collection('main').remove({
            id: req.params.id
        }, (err, result) => {
            res.send('Deleted !')
        })
    });
  }
})

app.listen(port, function() {
    console.log('Server Started on Port 5000…');
});



// app.get('/api/users/id/:id', function(req,res) {
//     Users.getUserById(req,res); // passing request and respond objs.
//     });

// app.get('/api/users/:_id', function(req,res) {
//         Users.getUserByOId(req,res);
//         });

// app.post('/api/users', function(req,res) {
//             Users.signup(req,res);
//             });

// app.post('/api/login', function(req,res) {
//                 Users.login(req,res);
//                 });

// // app.use( function(req, res, next) {
// //                     // code for token verification – continue on next slides
// //                     // if token is valid, continue to the specified sensitive route
// //                     // if token is NOT valid, return error message
// //                     var token = req.body.token || req.query.token || req.headers['x-access-token'];
// //                     if (token) {
// //                         jwt.verify(token, config.secret, function(err, decoded) {
// //                         if (err) {
// //                             return res.json({ success: false, message: 'Invalid token.' });
// //                         } else {
// //                             req.decoded = decoded; // add decoded token to request obj.
// //                             next(); // continue to the sensitive route
// //                         }
// //                         });
// //                     } else {
// //                        return res.status(403).send({
// //                        success: false,
// //                         message: 'No token provided.'
// //                                     });
// //                                     }
// //                     });


// app.get('/api/users', function(req,res) {
//                             if (req.decoded.admin) // check admin authorization
//                             users.getUsers(req,res);
//                             else {
//                             res.status(401).json( { // if not an admin user, return
//                             success: false, // an error message
//                             message: 'Unauthorized Access'
//                             });
//                         }
//                     });
// // app.listen(11555, function() {
// //     console.log('Server Started on Port 11555…');
// // });


// // // Lecture
// // app.get('/user/add', (req,res) => {

// // });

// // app.use(express.static(path.join(__dirname, 'public'))); // __dirname == current directory, create subfolder 'public' in current directory


// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'));

// // app.get('/', (req, res) => {
// //     // res.send('Root URL')
// //     res.render('index', {
// //         title: "Cusromer Lists: ",
// //         users: data.users
// //     });
// // });

// // app.post('/users/add', function(req, res) {
// //     var newUser = {
// //         name: req.body.name,
// //         age: parseInt(req.body.age),
// //         email: req.body.email
// //     }
// //     data.users.push(newUser);
// //     res.render('index', { // redirect to ‘/’
// //         title: 'Customer List',
// //         users: data.users
// //     });
// // });

// // app.get('/user', (req, res) => {
// //     res.json(users.users)
// // });

// // app.get('/sotus', function(req, res) {
// //     res.send('GET Request: Hello World..');
// // });

// // app.post('/sotus', function(req, res) {
// //     res.send('POST Request: Hello World..');
// // });

// // app.listen(3000, function() {
// //     console.log('Server Started on Port 3000…');
// // });

// app.use('/api', apiRoutes);
// apiRoutes.post('/authenticate', function(req, res) {

//      Users.login(req,res)
//     });

// apiRoutes.use(function(req, res, next) {
        
//             // check header or url parameters or post parameters for token
//             var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        
//             // decode token
//             if (token) {
        
//                 // verifies secret and checks exp
//                 jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
//                     if (err) {
//                         return res.json({ success: false, message: 'Failed to authenticate token.' });		
//                     } else {
//                         // if everything is good, save to request for use in other routes
//                         req.decoded = decoded;	
//                         next();
//                     }
//                 });
        
//             } else {
        
//                 // if there is no token
//                 // return an error
//                 return res.status(403).send({ 
//                     success: false, 
//                     message: 'No token provided.'
//                 });
                
//             }
            
//         });
        