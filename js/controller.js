function SampleCtrl($scope) {
	$scope.test = function() {
		console.log($rootScope);
		alert('SampleCtrl');
	}
}

function GplusCtrl($scope, $http) {
	$scope.signIn = false;
	$scope.renderProfile = function() {
		var request = gapi.client.plus.people.get( {'userId' : 'me'} );
		request.execute( function(profile) {
			$scope.getProfile = profile;
			$scope.$apply(function() {
				if ($scope.getProfile.error) {
					$scope.error = $scope.getProfile.error;
					return;
				}

				// Connect Server

				$scope.profileImage = $scope.getProfile.image.url;
				$scope.isSignIn = true;
			});
		});
	}

	$scope.signIn = function(authResult) {
		gapi.client.load('plus','v1', $scope.renderProfile);
	}
}