var demoApp = angular.module('TodoApp',[]); 
var serv = "localhost:8000";

demoApp.controller('MainController', function ($scope, $http){ 
    $scope.updateData = {};
    $scope.updateListe = {};
    $scope.listeData = {};
    $scope.listeDataP = {};
    $scope.tache = [];
    $scope.tacheP = [];

    $scope.nameTask={};
    $scope.user = {};
    $scope.collab = {};


    getTask = function(id, idx){        
        $scope.listeData.idListe = id;      
		    $http.post('/getTask', $scope.listeData)
			    .success(function(data) {
            $scope.tache[idx] = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
            });
    }

    
    getTaskP = function(id, idx){        
        $scope.listeDataP.idListe = id;      
		$http.post('/getTask', $scope.listeDataP)
			.success(function(data) {
                $scope.tacheP[idx] = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
            });
    }
    getListe = function(){
        $scope.user =$cookies;
        var req = {owner : $cookies.id};

        $http.get('/getList',req).then(function(resp){
            console.log($scope.Liste);
            $scope.Liste = resp.data
            i=0;
            for(l of resp.data){
                getTask(l._id,i);
                i++;
            }
        });    
    
//à enlever
    $http.get('/getList').then(function(resp){

        $scope.Liste = resp.data
        console.log($scope.Liste);
        i=0;
        for(l of resp.data){
            getTask(l._id,i);
            i++;
        }
    });//
    var req = {collaborator : $cookies.id};
    $http.post('/getListP',req).then(function(resp){
        console.log(" 2 : ", resp);
        $scope.ListeP = resp.data;
        i=0;
        for(l of resp.data){
            getTaskP(l._id, i);
            console.log(" resp : ", resp);
            i++;
        }
    });    
}

//lancée au chargement de la page: check des cookies, récupération des listes
if($cookies.user!=null){
    $scope.user =$cookies;
    var req = {owner : $cookies.id};
    $http.post('/getList',req).then(function(resp){
        console.log(" 1 : ",resp);
        $scope.Liste = resp.data;
        i=0;
        for(l of resp.data){
            getTask(l._id, i);
            i++;
        }
    });
    var req = {collaborator : $cookies.id};
    $http.post('/getListP',req).then(function(resp){
        console.log(" 2 : ", resp);
        $scope.ListeP = resp.data;
        i=0;
        for(l of resp.data){
            getTaskP(l._id, i);
            i++;
        }
    });
}else{
    document.location.href= serv + "/pageconn.html";
    } 
    
    $scope.createToDo = function(id){
        console.log($scope.nameTask.text);
        var req = {
            name : $scope.nameTask.text,
            idList : id
        };
		$http.post('/createToDo',req)
		.success(function(data) {
            $scope.nameTask={};
           getListe();
		})
		.error(function(data) {
			console.log('Error: ' + data);
        });   
    }

    $scope.deleteToDo = function(id){     
        var req = {
            identifiant : id 
        };
		$http.post('/deleteToDo', req)
			.success(function(data) {
				getListe();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
    }

    $scope.checkToDo =function(id, ok){
        $scope.updateData.identifiant = id;
        $scope.updateData.ok = !ok;
        $http.post('/checkToDo', $scope.updateData).success(function(data) {    
            getListe();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.updateToDo = function(id, idListe){
        $scope.updateData.identifiant = id;
        if($scope.updateData.text!=undefined){
            $http.post('/updateToDo', $scope.updateData).success(function(data) {    
                getListe();
                $scope.updateData = {}
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }

    $scope.createList = function(id){
        console.log($scope.nameList.text);
        if($scope.nameList!= undefined){
            var req = {
                nameList : $scope.nameList,
                owner : $cookies.id
            };
            $http.post('/createList',req)
            .success(function(data) {
                $scope.nameList="";
                getListe();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });   
        }
    }

    $scope.deleteList = function(id){     
        var req = {
            identifiant : id 
        };
		$http.post('/deleteList', req)
			.success(function(data) {
				getListe();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
    }


    $scope.updateList = function(){
        $scope.updateListe.identifiant= $scope._id;
        if($scope.updateListe.text!=undefined){
            $http.post('/updateList', $scope.updateListe).success(function(data) { 
                $scope.updateListe = {}; 
                getListe();
               
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
    };
})
