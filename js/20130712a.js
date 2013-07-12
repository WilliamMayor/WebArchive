function Ctrl($scope) {
	$scope.networkSize = 1000000;
	$scope.collectionSize = 1000000000000;
	$scope.documentSize = 1466000;
	$scope.replication = 3;

	$scope.pacIndexSize = 2000000;
	$scope.pacQuerySize = 100;

	$scope.pacStorage = $scope.documentSize * $scope.pacIndexSize;

	$scope.Math = window.Math;
	console.log(1);
}