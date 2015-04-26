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

/* PUT to glossary. */
router.put('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('glossarycollection');

    var courseId = req.body.course;
    var glossaryItemId = req.body.id;
    var glossaryItemName = req.body.name;
    var glossaryItemLongname = req.body.longname;
    var glossaryItemDescription = req.body.descr;
    var glossaryItemSources = req.body.sources;

    // otherwise delivers undefined because of dots in key (de.wikipedia.org)
    glossaryItemSources = glossaryItemSources.toJson;

    var glossaryItemId = req.params.id;
    var glossaryItemToUpdate = { "id" : glossaryItemId };
    collection.update(glossaryItemToUpdate, {
        "course" : courseId,
        "id" : glossaryItemId,
        "name" : glossaryItemName,
        "longname" : glossaryItemLongname,
        "descr" : glossaryItemDescription,
        "sources" : glossaryItemSources
    },     
                      function(err, doc) {
        if (err) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {
            res.status(201);
            res.send("201. JSON doc was updated: \n\n" + doc);
        }
    });

});

/* DELETE to glossary. */
router.delete('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('glossarycollection');
    var glossaryItemId = req.params.id;
    var glossaryItemToDelete = { "id" : glossaryItemId };
    collection.remove(glossaryItemToDelete, function(err, result) {
        if (err) {
            res.send((result === 1) ? { msg: '' } : { msg: 'error: ' + err });
        } else {
            res.send("204. Item with ID \"" + glossaryItemId + "\" successfully deleted. There is nothing here for you anymore.");
            res.status(204);
        }
    });
});

module.exports = router;
