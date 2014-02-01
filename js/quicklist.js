var fbRef;

angular.module("quicklist", ["firebase"])
    .factory("listService", ["$firebase", function($firebase) {
        fbRef = new Firebase("https://qwiklist.firebaseio.com/list");
        return $firebase(fbRef);
    }])

    .controller("listController", ["$scope", "$rootScope", "$firebaseSimpleLogin", "listService",
        function($scope, $rootScope, $firebaseSimpleLogin, listService) {
            $scope.items = listService;
            $rootScope.auth = $firebaseSimpleLogin(fbRef, function(error, user) {
                alert(hello);
                if (error) {
                    // an error occurred while attempting login
                    alert(error);
                } else if (user) {
                    // user authenticated with Firebase
                    alert('User ID: ' + user.id + ', Provider: ' + user.provider);
                } else {
                // user is logged out
                    alert('logged out');
                }
            });

            $rootScope.auth.$login('anonymous');

            //var user = $rootScope.auth.$getCurrentUser();

            //alert('User ID: ' + $rootScope.auth.user.id);

            $scope.addItem = function() {
                $scope.items.$add({ID: $scope.nextItemID(), name: $scope.itemName, checked: false});
                $scope.itemName = "";
            };

            $scope.nextItemID = function() {
                var maxItemID = 0;
                var keys = $scope.items.$getIndex();

                //https://www.firebase.com/docs/angular/reference.html#getindex
                keys.forEach(function (key, i) {
                    if($scope.items[key].ID > maxItemID) {
                        maxItemID = $scope.items[key].ID;
                    }
                });
                return maxItemID + 1;
            };

            $scope.deleteItem = function(itemID) {
                var keys = $scope.items.$getIndex();
                keys.forEach(function (key, i) {
                    if($scope.items[key].ID === itemID) {
                        $scope.items.$remove(key); 
                    }
                });
            };

            $scope.checkItem = function(itemID) {
                var keys = $scope.items.$getIndex();
                keys.forEach(function (key, i) {
                    if($scope.items[key].ID === itemID) {
                        $scope.items[key].checked = !($scope.items[key].checked); 
                        $scope.items.$save(key);                      
                    }
                });
            };
        }
    ]);



