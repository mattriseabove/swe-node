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

/* GET SWA glossaryItemsList page. */
router.get('/swa', function(req, res) {
    var db = req.db;
    var collection = db.get('glossarycollection');
    collection.find({ "course" : "SWA" },{},function(err, docs){
        res.send(docs);
    });
});

/* POST to glossary */
router.post('/', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var courseId = req.body.course;
    var glossaryItemId = req.body.id;
    var glossaryItemName = req.body.name;
    var glossaryItemLongname = req.body.longname;
    var glossaryItemDescription = req.body.descr;
    var glossaryItemSources = req.body.sources;
    
    // otherwise delivers undefined because of dots in key (de.wikipedia.org)
    glossaryItemSources = glossaryItemSources.toJson;

    // Set our collection
    var collection = db.get('glossarycollection');

    // Submit to the DB
    collection.insert({
        "course" : courseId,
        "id" : glossaryItemId,
        "name" : glossaryItemName,
        "longname" : glossaryItemLongname,
        "descr" : glossaryItemDescription,
        "sources" : glossaryItemSources
    }, function (err, doc) {
        if (err) {
            //res.send("There was a problem adding a glossaryItem to the database. Please stick to the documentation.");
            
            // for development!
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {
            res.status(201);
            res.send("201. JSON doc was created: \n\n" + doc);
        }
    });
});

/* DELETE to glossary. */
router.delete('/:id', function(req, res) {
    var db = req.db;
    var glossaryItemId = req.params.id;
    var glossaryItemToDelete = { "id" : glossaryItemId }
    db.collection.remove(glossaryItemToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
