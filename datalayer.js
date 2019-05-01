var MongoClient= require("mongodb").MongoClient;
var mongodb= require('mongodb');
var uri = "mongodb+srv://ghofrane:123456.ghofrane@cluster0-rzngt.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser : true});
var db;
 
var datalayer = {

    init : function(cb){
        client.connect(function(err){
            if(err) throw err;
            db = client.db('ToDo');
            cb();
        });
    },

    login : function(user, cb){
        var query={$and : [{username : user.username}, {password : user.password}]};
        db.collection("Users").find(query).toArray(function(err,docs){
            cb(docs);
        });
    },


    
    getTask : function(id, cb){
        var query={idList : id._id};
        db.collection("ToDo").find(query).toArray(function(err,docs){
            cb(docs);
        });
    },

    getList : function(cb){
        db.collection("List").find({}).toArray(function(err, docs){
            cb(docs);
        })
    },

    deleteToDo : function(id, cb){
        var query={_id : new mongodb.ObjectID(id._id)};
        db.collection("ToDo").deleteOne(query, function(err, result){
            cb();
        });
    },

    createToDo : function(task, cb){
        db.collection("ToDo").insertOne(task,function(err, result){
            cb();
        });
    },

    updateToDo : function(id, task, cb){
        var query={_id : new mongodb.ObjectID(id._id)};
        db.collection("ToDo").updateOne(query, {$set : task}, function(err, result){
            cb();
        });
    },
    createList : function(list, cb){
        db.collection("List").insertOne(list,function(err, result){
            cb();
        });
    },

    deleteList : function(id, cb){
        var query={_id : new mongodb.ObjectID(id._id)};
        db.collection("List").deleteOne(query, function(err, result){
            cb();
        });
    },

    updateList : function(id, list, cb){
        var query={_id : new mongodb.ObjectID(id._id)};
        db.collection("List").updateOne(query, {$set : list}, function(err, result){
            cb();
        });
    }
};

module.exports=datalayer;