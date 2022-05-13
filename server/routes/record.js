const express = require("express");
 
const postRoutes = express.Router();

// connect to the database
const dbo = require("../db/conn");
 
// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// get a list of all the posts
postRoutes.route("/post").get(function (req, res) {
 let db_connect = dbo.getDb("toilets");
 db_connect
   .collection("posts")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// gets a single post by id
postRoutes.route("/post/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("posts")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// create a new post
postRoutes.route("/post/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("posts").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// update a post by id.
postRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
     name: req.body.name,    
     position: req.body.position,     
     level: req.body.level,   
   }, 
  }
});
 
// delete a post
postRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("posts").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 post deleted");
   response.json(obj);
 });
});
 
module.exports = postRoutes;