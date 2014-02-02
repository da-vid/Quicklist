angular.module("quicklist", ["firebase"])
    .factory("listService", ["$firebase", function($firebase) {
        getListID();
        var ref = new Firebase("https://qwiklist.firebaseio.com/" + getListID());
        return $firebase(ref);
    }])

    .controller("listController", ["$scope", "listService",
        function($scope, listService) {
            $scope.items = listService;

            //form validation pattern: http://stackoverflow.com/a/18747273
            $scope.moreThanWhitespace = /\S/;

            $scope.addItem = function() {
                if ($scope.addItemForm.addItemBox.$valid) {
                    $scope.items.$add({ID: $scope.nextItemID(), name: $scope.itemName, checked: false});
                }
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

            $scope.checkItem = function(item) {
                item.checked = !item.checked;
                $scope.items.$save();
            };
        }
    ]);



