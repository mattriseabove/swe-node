var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'swe-node' });
});


/*
 *  U S E R  stuff
 */

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/*
 *  C O U R S E  stuff
 */

/* GET Corselist page. */
router.get('/courses', function(req, res) {
    var db = req.db;
    var collection = db.get('coursecollection');
    collection.find({},{},function(err, docs){
        res.send(docs);
    });
});

/* POST to Add Course */
router.post('/courses', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    
    var courseId = req.body.id;
    var courseName = req.body.name;
    var coursePage = req.body.page;
    
    // Set our collection
    var collection = db.get('coursecollection');

    // Submit to the DB
    collection.insert({
        "id" : courseId,
        "name" : courseName,
        "page" : coursePage
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding a course to the database.");
        }
        else {
            res.status(201);
            res.send("This JSON doc was created: \n\n"+ doc);
        }
    });
});

module.exports = router;
