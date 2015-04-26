var express = require('express');
var router = express.Router();

/* GET glossaryItemsList page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('glossarycollection');
    collection.find({},{},function(err, docs){
        res.send(docs);
    });
});

/* GET glossaryItemsList page. */
router.get('/swa', function(req, res) {
    var db = req.db;
    var collection = db.get('glossarycollection');
    collection.find({ "course" : "SWA" },{},function(err, docs){
        res.send(docs);
    });
});

/* POST to Add Course */
router.post('/', function(req, res) {

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
