const express = require('express');
const app=express();
var morgan = require('morgan');
const port= 8000;
var datalayer=require('./datalayer');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));
app.use(express.static('public'));
datalayer.init(function(){
    console.log("init");
    app.listen(port);
});

app.post('/getTask',function(req,res){
    var id = {_id : req.body.idListe}
    datalayer.getTask(id, function(dtSet){
        
        res.send(dtSet);
    });
});

app.get('/getList', function(req, res){
    
    datalayer.getList(function(dtSet){      
        res.send(dtSet);
    })
})

app.post('/deleteToDo', function(req, res){
    var id = { _id : req.body.identifiant  };
    datalayer.deleteToDo(id, function(){
        res.send({success : true});
    })
});

app.post('/createToDo', function(req,res){
    if(req.body && typeof req.body.name != 'undefined' ){  
        var task = {
            name : req.body.name,
            ok : false,
            idList : req.body.idList
        };    
        datalayer.createToDo(task, function(){
            res.send({success : true});
        });
    }else{

        res.send({
            success : false,
            errorCode : "PARAM_MISSING"
        });
    }
});

app.post('/updateToDo', function(req,res){
    var id = { _id : req.body.identifiant };
    var task = {name : req.body.text};
    datalayer.updateToDo(id,task,function(){
            res.send({success : true});

    });
});

app.post('/checkToDo', function(req,res){
    var id = { _id : req.body.identifiant  };
    var ok = {ok : req.body.ok};
    datalayer.updateToDo(id,ok, function(){
            res.send({success : true});
    });
});


app.post('/deleteList', function(req, res){
    var id = { _id : req.body.identifiant  };
    datalayer.deleteList(id, function(){
        res.send({success : true});
    })
});


app.post('/createList',function(req,res){
    if(req.body && typeof req.body.name != 'undefined' ){  
        var Liste = {
            name : req.body.name,
            
         };    
        datalayer.createList(Liste, function(){
            res.send({success : true});
        });
    }else{

            res.send({
                success : false,
                errorCode : "PARAM_MISSING"
            });
        }
    

        

})
