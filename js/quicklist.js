var quicklist = angular.module('quicklist', []);

quicklist.controller('listController', function($scope){
    $scope.items = [];
  
    $scope.addItem = function addItem(){
        if($scope.newItemForm.$valid)
        {
            $scope.items.push({
                "ID":$scope.nextItemID(),
                "name":$scope.nextItemName,
                "checked":false
            });
        }
    };

    $scope.deleteItem = function deleteItem(itemID){
        var index = -1;
        for (var i = 0, len = $scope.items.length; i < len; i++) {
            if ($scope.items[i].ID === itemID) {
                index = i;
                break;
            }            
        }

        $scope.items.splice(index, 1);
    };

    $scope.nextItemID = function nextItemID(){
        if($scope.items.length===0) {
            return 0;
        }
        //the maximum ID in the $scope.items array incremented by 1
        //http://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
        return Math.max.apply(Math,$scope.items.map(function(o){return o.ID;}))+1;
    };
});