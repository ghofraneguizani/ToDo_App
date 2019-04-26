var demoApp = angular.module('TodoApp',[]); 

demoApp.controller('MainController', function ($scope, $http){ 
    $scope.updateData = {};
    $scope.updateListe = {};
    $scope.listeData = {};
    $scope.tache = [];
    $scope.nameTask={};

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
    getListe = function(){
        $http.get('/getList').then(function(resp){
            $scope.Liste = resp.data
            i=0;
            for(l of resp.data){
                getTask(l._id,i);
                i++;
            }
        });    
    }
    $http.get('/getList').then(function(resp){
        $scope.Liste = resp.data
        i=0;
        for(l of resp.data){
            getTask(l._id, i);
            i++;
        }
    });    
    
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
        $http.post('/updateToDo', $scope.updateData).success(function(data) {    
            getListe();
            $scope.updateData = {}
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
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

    $scope.createList = function(id){
        console.log($scope.nameList.text);
        var req = {
            name : $scope.nameTask.text,
            idList : id
        };
		$http.post('/createList',req)
		.success(function(data) {
            $scope.nameList={};
           getListe();
		})
		.error(function(data) {
			console.log('Error: ' + data);
        });   
    }


});
