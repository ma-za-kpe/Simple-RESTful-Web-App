var express = require('express');
var router = express.Router();
var ObjectId = rrequire('mongodb').ObjectID;

router.get('/userlist', (req, res, next) => {
  var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},(e,docs) => {
      res.json(docs);
    });
  });

  router.post('/adduser', (req, res, next) => {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, (err, result) => {
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  });

  router.put('/update/:id', (req, res, next) => {
    var db = req.db;
    var collection = db.get('userlist');

    var userId = req.params.id;
    var userEmail = req.params.email;
    var userFullName = req.params.username;
    var userAge = req.params.age;
    var userLocation = req.params.location;
    var userGender = req.params.gender;

    collection.updateOne({ "_id": ObjectID(userId)} ,{$set: {"username": userFullName},{"age": userAge},{"location": userLocation},{"email": userEmail},{"gender": userGender} } , (err, result) => {

                            res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });

    });

  });

  router.delete('/deleteuser/:id', (req, res) => {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});


//   router.post('/adduser', (req, res, next) => {
//
//     // Set our internal DB variable
//     var db = req.db;
//
//     // Get our form values. These rely on the "name" attributes
//     var userName = req.body.username;
//     var userEmail = req.body.email;
//     var userFullname = req.body.fullname;
//     var age = req.body.age;
//     var location = req.body.location;
//     var gender = req.body.gender;
//
//     // Set our collection
//     var collection = db.get('userlist');
//
//     // Submit to the DB
//     collection.insert({
//         "username": userName,
//        "email": userEmail,
//        "fullname": userFullname,
//        "age": age,
//        "location": location,
//        "gender": gender
//     }, (err, doc) => {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem adding the information to the database.");
//         }
//         else {
//             // And forward to success page
//             //res.redirect("userlist");
//         }
//     });
// });



module.exports = router;
