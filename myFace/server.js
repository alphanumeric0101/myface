var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var app = express();
var Sequelize = require("sequelize");
app.use(bodyParser.json());


//////////////////////////////////////////
// Begin Tables config Section ///////////
//////////////////////////////////////////

var conn = new Sequelize('faces', 'alphanumeric0101'); //database, username, password

var Account = conn.define('Account', {
    fistName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    tableName: 'Account' // By default, Sequelize will assume our table name is the plural form
});

var Tokens = conn.define('Tokens', {
    token: Sequelize.STRING,
    accountId: Sequelize.STRING
}, {
    tableName: 'Tokens'
});

Account.hasOne(Tokens, {
    foreignKey: 'accountId'
});

var Posts = conn.define('Posts', {
    content: Sequelize.STRING,
    accountId: Sequelize.STRING,
    createdOn: Sequelize.DATE,
    author: Sequelize.STRING,
    attachment: Sequelize.STRING
}, {
    tableName: 'Posts'
});

Account.hasMany(Posts, {
    foreignKey: 'accountID'
});

// Serving HTML
////////////////

app.get('/', function(req, res){
    res.send('index.html')
})


//////////////////////////////////////
// BEGIN USER SIGN UP SIGN IN ////////
//////////////////////////////////////

// SIGN UP

app.post('/accounts/signup', function(req, res) {
    var hashedpw;
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        if (err) {
            console.log('something went wrong hashing that password');
        }
        else {
            hashedpw = hash;
            Account.create({
                email: req.body.email,
                password: hashedpw,
            }).then(function(result) {
                res.json('New Account created: ' + result);
            }).catch(function(err) {
                console.log(err);
                res.status(409).json({
                    "error": "There is already an account with that email"
                });
            });
        }
    });
});

// SIGN IN

app.post('/accounts/login', function(req, res) {
    Account.find({
        where: {
            email: req.body.email
        }
    }).then(function(result) {
        bcrypt.compare(req.body.password, result.password, function(err, hashcomp) {
            if (err) {
                console.log('compare function failure...');
            }
            else if (hashcomp) {
                Tokens.create({
                    token: bcrypt.genSaltSync(),
                    accountId: result.id
                }).then(function(ress) {
                    res.send('Welcome back! \nYour token is: ' + ress.token);
                }).catch(function(err) {
                    console.log(err);
                });
            }
            else {
                res.status(401).send('Password or email incorrect');
            }
        });
    });
});

// Assign Token 

app.use(function(req, res, next) {
    var toke = (req.query.token ? req.query.token : req.body.token);
    Tokens.findOne({
        where: {
            token: toke
        }
    }).then(function(result) {
        if (result) {
            req.accountId = result.accountId;
            next();
        }
        else {
            req.accountId = null;
            next();
        }
    });
});

//////////////////////////////////////////
// Begin Server INIT Section /////////////
//////////////////////////////////////////

var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
