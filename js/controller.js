angular.module('RouteControllers', [])
	.controller('HomeController', function($scope)	{
		$scope.title = "Welcome To Angular Todo";
	})
	.controller('RegisterController', function($scope, $location, UserAPIService, store)	{

		if(store.get('authToken'))	{
			$location.path("/todo");
		}else	{
			$scope.registrationUser =  {};
			var url = "https://morning-castle-91468.herokuapp.com/";

			$scope.submitForm = function()	{
				if($scope.registrationForm.$valid)	{
					$scope.registrationUser.username = $scope.user.username;
					$scope.registrationUser.password = $scope.user.password;

					UserAPIService.callAPI(url + "accounts/register/", $scope.registrationUser).then(function(results)	{
						$scope.data = results.data;
						if ($scope.data.username == $scope.registrationUser.username && $scope.data.password == $scope.registrationUser.password)	{
							//alert("You have successfully registered to Angular Todo");

							UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.data).then(function (results) {
								$scope.token = results.data.token;
								store.set('username', $scope.registrationUser.username);
								store.set('authToken', $scope.token);
								console.log($scope.token);
								$location.path("/todo");
							}).catch(function(err)	{
								console.log(err);
							});
						}
					}).catch(function(err)	{
						console.log(err);
					})
				}
			}
		}
	})
	
	.controller('TodoController', function($scope, $location, TodoAPIService, store)	{
		var URL = "https://morning-castle-91468.herokuapp.com/";
		
		if (!store.get('authToken'))	{
			console.log("Run");
			$location.path("/accounts/register");
		}else	{

			$scope.authToken = store.get('authToken');
			$scope.username = store.get('username');
		
			$scope.todos = [];

			TodoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results)	{
				$scope.todos = results.data;
			}).catch(function(err)	{
				console.log(err);
			});

			$scope.submitForm = function()	{
				if ($scope.todoForm.$valid)	{
					$scope.todo.username = $scope.username;
					$scope.todos.push($scope.todo);

					TodoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results)	{
						console.log(results);
					}).catch(function(err)	{
						console.log(err);
					});
				}
			}

			$scope.editTodo = function(id)	{
				console.log(id);
				$location.path("/todo/edit/" + id);
			};

			$scope.deleteTodo = function(id)	{
				TodoAPIService.deleteTodo(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results)	{
					console.log(results);
				}).catch(function(err)	{
					console.log(err);
				});
			}
		}
	})
	.controller('EditTodoController', function($scope, $location, $routeParams, TodoAPIService, store)	{
		var id = $routeParams.id;
		var URL = "https://morning-castle-91468.herokuapp.com/";

		TodoAPIService.getTodos(URL + "todo/" + id, $scope.username, store.get('authToken')).then(function(results)	{
			$scope.todo = results.data;
		}).catch(function(err)	{
			console.log(err);
		})

		$scope.submitForm = function()	{
			if ($scope.todoForm.$valid)	{
				$scope.todo.username = $scope.username;

				TodoAPIService.editTodo(URL + "todo/" + id, $scope.todo, store.get('authToken')).then(function(results)	{
					$location.path("/todo");
				}).catch(function(err)	{
					console.log(err);
				})
			}
		}
	})

	.controller('LoginController', function($scope,$location,$routeParams, UserAPIService, store)	{
		$scope.loginUser =  {};
		var url = "https://morning-castle-91468.herokuapp.com/";

		if (store.get('authToken'))	{
			console.log("Run");
			$location.path("/todo");
		}else	{

			$scope.submitForm = function()	{
				if($scope.loginForm.$valid)	{
					$scope.loginUser.username = $scope.login.username;
					$scope.loginUser.password = $scope.login.password;

					console.log("Login user " + $scope.loginUser.username);
					console.log("Login pass " + $scope.loginUser.password);

					UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.loginUser).then(function (results) {
						 $scope.token = results.data.token;
						 store.set('username', $scope.loginUser.username);
						 store.set('authToken', $scope.token);
						 console.log("Token = " + $scope.token);
						 $location.path("/todo");
					}).catch(function(err)	{
						console.log(err);
					});
				}		
			}
		}
	})
	
	.controller('LogoutController', function($scope,store)	{
		if(store.get('authToken'))	{
			console.log("You have a token");
			store.remove('authToken');
			store.remove('username');
			$scope.loggedOut = "You have been logged out";
		}else	{
			console.log("No Token");
			$scope.loggedOut = "You are not logged in";
		}

	})

	.controller('NavbarController', function($scope, store)	{
		
		if (store.get('authToken'))	{
			$scope.username = "User : " + store.get('username');
			$scope.loggedInStatusRoute = "#/logout"	
			$scope.loggedInStatusName = "Logout"
		}else	{
			$scope.username = "";
			$scope.loggedInStatusRoute = "#/login"
			$scope.loggedInStatusName = "Login"
		}

		
	})


