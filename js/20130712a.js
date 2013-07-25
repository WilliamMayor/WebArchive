var app = angular.module("app", []);

var range = function(from, to, step) {
	var a = [];
	var value = from;
	while (value < to) {
		a.push(value);
		value += step;
	}
	return a;
}

var zip = function() {
    var args = [].slice.call(arguments);
    var shortest = args.length==0 ? [] : args.reduce(function(a,b){
        return a.length<b.length ? a : b
    });

    return shortest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}

app.controller("Ctrl", function($scope) {
	$scope.networkSize = 1000000;
	$scope.collectionSize = 1000000000000;
	$scope.documentSize = 1466000;
	$scope.replication = 3;

	$scope.pac = {
		querySize: {
			value: 100,
			fixed: false,
			update: function() {
				$scope.pac.querySize.value = Math.log(1 - $scope.pac.lookup.probability.value) / Math.log(1 - $scope.pac.replication.factor.value / $scope.networkSize);
			},
			changed: function() {
				if ($scope.pac.lookup.fixed) {
					$scope.pac.replication.update();
					$scope.pac.local.update();
				} else {
					$scope.pac.lookup.update();
				}
			},
			switched: function() {
				if ($scope.pac.querySize.fixed) {
					if ($scope.pac.lookup.fixed) {
						$scope.pac.replication.fixed = true;
					} else if ($scope.pac.replication.fixed) {
						$scope.pac.lookup.fixed = true;
					}
				} else if ($scope.pac.lookup.fixed && $scope.pac.replication.fixed) {
					$scope.pac.lookup.fixed = false;
				}
			}
		},
		local: {
			index: {
				value: 2000000,
				changed: function() {
					$scope.pac.local.storage.value = $scope.documentSize * $scope.pac.local.index.value;
					$scope.pac.local.changed();
				}
			},
			storage: {
				value: 1466000 * 2000000,
				changed: function() {
					$scope.pac.local.index.value = $scope.pac.local.storage.value / $scope.documentSize;
					$scope.pac.local.changed();
				}
			},
			changed: function() {
				$scope.pac.replication.factor.value = $scope.networkSize * $scope.pac.local.index.value / $scope.collectionSize;
				$scope.pac.replication.comparison.value = $scope.pac.replication.factor.value / $scope.replication;
				if ($scope.pac.lookup.fixed) {
					$scope.pac.querySize.update();
				} else {
					$scope.pac.lookup.update();
				}
			},
			update: function() {
				$scope.pac.local.storage.value = $scope.documentSize * $scope.collectionSize * $scope.pac.replication.factor.value / $scope.networkSize;
				$scope.pac.local.index.value = $scope.pac.local.storage.value / $scope.documentSize;
			}
		},
		replication: {
			factor: {
				value: 2,
				changed: function() {
					$scope.pac.replication.comparison.value = $scope.pac.replication.factor.value / $scope.replication;
					$scope.pac.replication.changed();
				}
			},
			comparison: {
				value: 2 / 3,
				changed: function() {
					$scope.pac.replication.factor.value = $scope.pac.replication.comparison.value * $scope.replication;
					$scope.pac.replication.changed();
				}
			},
			update: function() {
				$scope.pac.replication.factor.value = $scope.networkSize * (1 - Math.exp(Math.log(1 - $scope.pac.lookup.probability.value) / $scope.pac.querySize.value));
				$scope.pac.replication.comparison.value = $scope.pac.replication.factor.value / $scope.replication;
			},
			changed: function() {
				$scope.pac.local.update();
				if ($scope.pac.lookup.fixed) {
					$scope.pac.querySize.update();
				} else {
					$scope.pac.lookup.update();
				}
			},
			switched: function() {
				if ($scope.pac.replication.fixed) {
					if ($scope.pac.lookup.fixed) {
						$scope.pac.querySize.fixed = true;
					} else if ($scope.pac.querySize.fixed) {
						$scope.pac.lookup.fixed = true;
					}
				} else if ($scope.pac.lookup.fixed && $scope.pac.querySize.fixed) {
					$scope.pac.lookup.fixed = false;
				}
			},
			fixed: false
		},
		lookup: {
			probability: {
				value: 1 - Math.pow(1-(2 / 1000000), 100),
				changed: function() {
					$scope.pac.lookup.repetition.value = 1 / $scope.pac.lookup.probability.value;
					$scope.pac.lookup.changed();
				}
			},
			repetition: {
				value: 1 / (1 - Math.pow(1-(2 / 1000000), 100)),
				changed: function() {
					$scope.pac.lookup.probability.value = 1 / $scope.pac.lookup.repetition.value;
					$scope.pac.lookup.changed();
				}
			},
			changed: function() {
				if ($scope.pac.querySize.fixed) {
					$scope.pac.replication.update();
				} else {
					$scope.pac.querySize.update();					
				}
			},
			update: function() {
				$scope.pac.lookup.probability.value = 1 - Math.pow(1 - $scope.pac.replication.factor.value / $scope.networkSize, $scope.pac.querySize.value);
				$scope.pac.lookup.repetition.value = 1 / $scope.pac.lookup.probability.value;
			},
			switched: function() {
				if ($scope.pac.lookup.fixed) {
					if ($scope.pac.querySize.fixed) {
						$scope.pac.replication.fixed = true;
					} else if ($scope.pac.replication.fixed) {
						$scope.pac.querySize.fixed = true;
					}
				} else if ($scope.pac.querySize.fixed && $scope.pac.replication.fixed) {
					$scope.pac.querySize.fixed = false;
				}
			},
			fixed: false
		},
		chart: function(rescale) {
			var x = [0];
			var y = [0];
			switch ($scope.pac.chart.x.selected.name) {
				case "Query Size":
					if (rescale) {
						$scope.pac.chart.x.from = Math.max(1, $scope.pac.querySize.value-100);
						$scope.pac.chart.x.to = $scope.pac.querySize.value+100;
						$scope.pac.chart.x.step = 1;
					}
					x = range(Number($scope.pac.chart.x.from), Number($scope.pac.chart.x.to), Number($scope.pac.chart.x.step));
					switch ($scope.pac.chart.y.selected.name) {
						case "Query Size":
							y = x;
							break;
						case "Index Size":
							y = x.map(function(e) {
								return $scope.collectionSize * (1 - Math.exp(Math.log(1 - $scope.pac.lookup.probability.value) / e));
							});
							break;
						case "Local Storage":
							y = x.map(function(e) {
								return $scope.documentSize * $scope.collectionSize * (1 - Math.exp(Math.log(1 - $scope.pac.lookup.probability.value) / e));
							});
							break;
						case "Replication":
							y = x.map(function(e) {
								return $scope.networkSize * (1 - Math.exp(Math.log(1 - $scope.pac.lookup.probability.value) / e));
							});
							break;
						case "Replication Comparison":
							y = x.map(function(e) {
								return $scope.networkSize * (1 - Math.exp(Math.log(1 - $scope.pac.lookup.probability.value) / e)) / $scope.replication;
							});
							break;
						case "Lookup Probability":
							y = x.map(function(e) {
								return 1 - Math.pow(1 - $scope.pac.replication.factor.value / $scope.networkSize, e);
							});
							break;
						case "Lookup Repetition":
							y = x.map(function(e) {
								return 1 / (1 - Math.pow(1 - $scope.pac.replication.factor.value / $scope.networkSize, e));
							});
							break;
					}
					break;
				case "Index Size":
					if (rescale) {
						$scope.pac.chart.x.from = Math.max(1000000, $scope.pac.local.index.value-1000000);
						$scope.pac.chart.x.to = $scope.pac.local.index.value+1000000;
						$scope.pac.chart.x.step = 10000;
					}
					x = range(Number($scope.pac.chart.x.from), Number($scope.pac.chart.x.to), Number($scope.pac.chart.x.step));
					switch ($scope.pac.chart.y.selected.name) {
						case "Query Size":
							y = x.map(function(e) {
								return Math.log(1 - $scope.pac.lookup.probability.value) / Math.log(1 - e / $scope.collectionSize);
							});
							break;
						case "Index Size":
							y = x;
							break;
						case "Local Storage":
							y = x.map(function(e) {
								return e * $scope.documentSize;
							});
							break;
						case "Replication":
							y = x.map(function(e) {
								return $scope.networkSize * e / $scope.collectionSize;
							});
							break;
						case "Replication Comparison":
							y = x.map(function(e) {
								return ($scope.networkSize * e / $scope.collectionSize) / $scope.replication;
							});
							break;
						case "Lookup Probability":
							y = x.map(function(e) {
								return 1 - Math.pow(1 - e / $scope.collectionSize, $scope.pac.querySize.value);
							});
							break;
						case "Lookup Repetition":
							y = x.map(function(e) {
								return 1/ (1 - Math.pow(1 - e / $scope.collectionSize, $scope.pac.querySize.value));
							});
							break;
					}
					break;
				case "Local Storage":
					if (rescale) {
						$scope.pac.chart.x.from = Math.max(1466000000000, $scope.pac.local.storage.value-1466000000000);
						$scope.pac.chart.x.to = $scope.pac.local.storage.value+1466000000000;
						$scope.pac.chart.x.step = 1000000000;
					}
					x = range(Number($scope.pac.chart.x.from), Number($scope.pac.chart.x.to), Number($scope.pac.chart.x.step));
					switch ($scope.pac.chart.y.selected.name) {
						case "Query Size":
							y = x.map(function(e) {
								return Math.log(1 - $scope.pac.lookup.probability.value) / Math.log(1 - e / ($scope.collectionSize * $scope.documentSize));
							});
							break;
						case "Index Size":
							y = x.map(function(e) {
								return e / $scope.documentSize;
							});
							break;
						case "Local Storage":
							y = x;
							break;
						case "Replication":
							y = x.map(function(e) {
								return $scope.networkSize * e / ($scope.collectionSize * $scope.documentSize);
							});
							break;
						case "Replication Comparison":
							y = x.map(function(e) {
								return ($scope.networkSize * e / ($scope.collectionSize * $scope.documentSize)) / $scope.replication;
							});
							break;
						case "Lookup Probability":
							y = x.map(function(e) {
								return 1 - Math.pow(1 - e / ($scope.collectionSize * $scope.documentSize), $scope.pac.querySize.value);
							});
							break;
						case "Lookup Repetition":
							y = x.map(function(e) {
								return 1/ (1 - Math.pow(1 - e / ($scope.collectionSize * $scope.documentSize), $scope.pac.querySize.value));
							});
							break;
					}
					break;
				case "Replication":
					if (rescale) {
						$scope.pac.chart.x.from = Math.max(0.01, $scope.pac.replication.factor.value-1);
						$scope.pac.chart.x.to = $scope.pac.replication.factor.value+1;
						$scope.pac.chart.x.step = 0.01;
					}
					x = range(Number($scope.pac.chart.x.from), Number($scope.pac.chart.x.to), Number($scope.pac.chart.x.step));
					switch ($scope.pac.chart.y.selected.name) {
						case "Query Size":
							y = x.map(function(e) {
								return Math.log(1 - $scope.pac.lookup.probability.value) / Math.log(1 - e / $scope.networkSize);
							});
							break;
						case "Index Size":
							y = x.map(function(e) {
								return $scope.collectionSize * e / $scope.networkSize;
							});
							break;
						case "Local Storage":
							y = x.map(function(e) {
								return $scope.collectionSize * $scope.documentSize * e / $scope.networkSize;
							});
							break;
						case "Replication":
							y = x;
							break;
						case "Replication Comparison":
							y = x.map(function(e) {
								return e / $scope.replication;
							});
							break;
						case "Lookup Probability":
							y = x.map(function(e) {
								return 1 - Math.pow(1 - e / $scope.networkSize, $scope.pac.querySize.value);
							});
							break;
						case "Lookup Repetition":
							y = x.map(function(e) {
								return 1/ (1 - Math.pow(1 - e / $scope.networkSize, $scope.pac.querySize.value));
							});
							break;
					}
					break;
				case "Replication Comparison":
					if (rescale) {
						$scope.pac.chart.x.from = Math.max(0.01, $scope.pac.replication.comparison.value-1);
						$scope.pac.chart.x.to = $scope.pac.replication.comparison.value+1;
						$scope.pac.chart.x.step = 0.01;
					}
					x = range(Number($scope.pac.chart.x.from), Number($scope.pac.chart.x.to), Number($scope.pac.chart.x.step));
					switch ($scope.pac.chart.y.selected.name) {
						case "Query Size":
							y = x.map(function(e) {
								return Math.log(1 - $scope.pac.lookup.probability.value) / Math.log(1 - e * $scope.replication / $scope.networkSize);
							});
							break;
						case "Index Size":
							y = x.map(function(e) {
								return $scope.collectionSize * e * $scope.replication / $scope.networkSize;
							});
							break;
						case "Local Storage":
							y = x.map(function(e) {
								return $scope.collectionSize * $scope.documentSize * e * $scope.replication / $scope.networkSize;
							});
							break;
						case "Replication":
							y = x.map(function(e) {
								return e * $scope.replication;
							});
							break;
						case "Replication Comparison":
							y = x;
							break;
						case "Lookup Probability":
							y = x.map(function(e) {
								return 1 - Math.pow(1 - e * $scope.replication / $scope.networkSize, $scope.pac.querySize.value);
							});
							break;
						case "Lookup Repetition":
							y = x.map(function(e) {
								return 1/ (1 - Math.pow(1 - e * $scope.replication / $scope.networkSize, $scope.pac.querySize.value));
							});
							break;
					}
					break;
				case "Lookup Probability":
					if (rescale) {
						$scope.pac.chart.x.from = 0.01;
						$scope.pac.chart.x.to = 1;
						$scope.pac.chart.x.step = 0.01;
					}
					x = range(Number($scope.pac.chart.x.from), Number($scope.pac.chart.x.to), Number($scope.pac.chart.x.step));
					switch ($scope.pac.chart.y.selected.name) {
						case "Query Size":
							y = x.map(function(e) {
								return Math.log(1 - e) / Math.log(1 - $scope.pac.replication.factor.value / $scope.networkSize);
							});
							break;
						case "Index Size":
							y = x.map(function(e) {
								return $scope.collectionSize * (1 - Math.exp(Math.log(1 - e) / $scope.pac.querySize.value));
							});
							break;
						case "Local Storage":
							y = x.map(function(e) {
								return $scope.documentSize * $scope.collectionSize * (1 - Math.exp(Math.log(1 - e) / $scope.pac.querySize.value));
							});
							break;
						case "Replication":
							y = x.map(function(e) {
								return $scope.networkSize * (1 - Math.exp(Math.log(1 - e) / $scope.pac.querySize.value));
							});
							break;
						case "Replication Comparison":
							y = x.map(function(e) {
								return ($scope.networkSize * (1 - Math.exp(Math.log(1 - e) / $scope.pac.querySize.value))) / $scope.replication;
							});
							break;
						case "Lookup Probability":
							y = x;
							break;
						case "Lookup Repetition":
							y = x.map(function(e) {
								return 1 / e;
							});
							break;
					}
					break;
				case "Lookup Repetition":
					if (rescale) {
						$scope.pac.chart.x.from = Math.max(1, $scope.pac.lookup.repetition.value-1000);
						$scope.pac.chart.x.to = $scope.pac.lookup.repetition.value+1000;
						$scope.pac.chart.x.step = 100;
					}
					x = range(Number($scope.pac.chart.x.from), Number($scope.pac.chart.x.to), Number($scope.pac.chart.x.step));
					switch ($scope.pac.chart.y.selected.name) {
						case "Query Size":
							y = x.map(function(e) {
								return Math.log(1 - 1 / e) / Math.log(1 - $scope.pac.replication.factor.value / $scope.networkSize);
							});
							break;
						case "Index Size":
							y = x.map(function(e) {
								return $scope.collectionSize * (1 - Math.exp(Math.log(1 - 1 / e) / $scope.pac.querySize.value));
							});
							break;
						case "Local Storage":
							y = x.map(function(e) {
								return $scope.documentSize * $scope.collectionSize * (1 - Math.exp(Math.log(1 - 1 / e) / $scope.pac.querySize.value));
							});
							break;
						case "Replication":
							y = x.map(function(e) {
								return $scope.networkSize * (1 - Math.exp(Math.log(1 - 1 / e) / $scope.pac.querySize.value));
							});
							break;
						case "Replication Comparison":
							y = x.map(function(e) {
								return ($scope.networkSize * (1 - Math.exp(Math.log(1 - 1 / e) / $scope.pac.querySize.value))) / $scope.replication;
							});
							break;
						case "Lookup Probability":
							y = x.map(function(e) {
								return 1 / e;
							});
							break;
						case "Lookup Repetition":
							y = x;
							break;
					}
					break;
			}
			if (rescale) {
				$scope.pac.chart.y.from = Math.min.apply(null, y);
				$scope.pac.chart.y.to = Math.max.apply(null, y);
			}
			$.plot($("#pacChart"), [zip(x, y)], {
				series: {
				    lines: {show: true},
				    points: {show: false}
				},
				xaxis: {
					min: $scope.pac.chart.x.from,
					max: $scope.pac.chart.x.to,
					axisLabel: $scope.pac.chart.x.selected.name,
            		axisLabelUseCanvas: true,
            		axisLabelFontSizePixels: 12
				},
				yaxis: {
					min: $scope.pac.chart.y.from,
					max: $scope.pac.chart.y.to,
					axisLabel: $scope.pac.chart.y.selected.name,
            		axisLabelUseCanvas: true,
            		axisLabelFontSizePixels: 12
				}
			});
		}
	};
	$scope.pac.chart.x = {
		from: 1,
		to: 200,
		step: 1,
		options: [
			{name: "Query Size"},
			{name: "Index Size"},
			{name: "Local Storage"},
			{name: "Replication"},
			{name: "Replication Comparison"},
			{name: "Lookup Probability"},
			{name: "Lookup Repetition"}
		]
	};
	$scope.pac.chart.x.selected = $scope.pac.chart.x.options[0];
	$scope.pac.chart.y = {
		from: 0,
		to: 0.0004,
		options: [
			{name: "Query Size"},
			{name: "Index Size"},
			{name: "Local Storage"},
			{name: "Replication"},
			{name: "Replication Comparison"},
			{name: "Lookup Probability"},
			{name: "Lookup Repetition"}
		]
	};
	$scope.pac.chart.y.selected = $scope.pac.chart.y.options[5];


	$scope.changed = function() {
		$scope.pac.replication.factor.value = ($scope.networkSize * $scope.pac.local.storage.value) / ($scope.collectionSize * $scope.documentSize);
		$scope.pac.replication.factor.changed();
	}

	$scope.pac.chart()
});